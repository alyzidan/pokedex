import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { usePokemonInfinite } from "@/hooks/use-pokemon-infinite";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("usePokemonInfinite", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns hasNextPage=true and correct next offset when next URL is present", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            count: 1302,
            results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
            next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20",
          }),
      })
    );

    const { result } = renderHook(() => usePokemonInfinite(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(true);
  });

  it("returns hasNextPage=false when next is null", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            count: 1,
            results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
            next: null,
          }),
      })
    );

    const { result } = renderHook(() => usePokemonInfinite(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(false);
  });

  it("passes the offset from the next URL to the subsequent fetch call", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            count: 1302,
            results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
            next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=40",
          }),
      })
      .mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            count: 1302,
            results: [{ name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" }],
            next: null,
          }),
      });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => usePokemonInfinite(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    result.current.fetchNextPage();

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

    expect(fetchMock).toHaveBeenLastCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=40"
    );
  });

  it("enters error state on a failed fetch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );

    const { result } = renderHook(() => usePokemonInfinite(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toContain("500");
  });
});
