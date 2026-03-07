import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { usePokemonList } from "@/hooks/use-pokemon-list";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("usePokemonList", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns pokemon with the correct data shape", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            count: 1302,
            results: [
              { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
            ],
          }),
      })
    );

    const { result } = renderHook(() => usePokemonList(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pokemon[0]).toEqual({
      id: 1,
      name: "bulbasaur",
      spriteUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    });
    expect(result.current.data?.totalPages).toBe(66);
    expect(result.current.data?.totalCount).toBe(1302);
  });

  it("enters loading state before data resolves", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(new Promise(() => {}))
    );

    const { result } = renderHook(() => usePokemonList(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("enters error state on a failed fetch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );

    const { result } = renderHook(() => usePokemonList(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toContain("500");
  });
});
