import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  extractIdFromUrl,
  getSpriteUrl,
  fetchPokemonList,
  fetchPokemonInfinite,
  fetchPokemonDetail,
} from "@/lib/api";

describe("extractIdFromUrl", () => {
  it("extracts the numeric ID from a standard PokéAPI pokemon URL", () => {
    expect(extractIdFromUrl("https://pokeapi.co/api/v2/pokemon/1/")).toBe(1);
    expect(extractIdFromUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(25);
    expect(extractIdFromUrl("https://pokeapi.co/api/v2/pokemon/151/")).toBe(151);
  });

  it("returns 0 for a URL that does not match the expected pattern", () => {
    expect(extractIdFromUrl("https://pokeapi.co/api/v2/ability/1/")).toBe(0);
    expect(extractIdFromUrl("invalid-url")).toBe(0);
  });
});

describe("getSpriteUrl", () => {
  it("returns the official-artwork sprite URL for the given ID", () => {
    expect(getSpriteUrl(1)).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    );
    expect(getSpriteUrl(25)).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    );
  });
});

const mockListResponse = (count: number, results: { name: string; url: string }[]) =>
  vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ count, results, next: null }),
  });

describe("fetchPokemonList", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls the correct URL for page 1 (offset 0)", async () => {
    const fetchMock = mockListResponse(1302, []);
    vi.stubGlobal("fetch", fetchMock);

    await fetchPokemonList(1);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );
  });

  it("calls the correct URL for page 2 (offset 20)", async () => {
    const fetchMock = mockListResponse(1302, []);
    vi.stubGlobal("fetch", fetchMock);

    await fetchPokemonList(2);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
    );
  });

  it("calculates totalPages as ceil(count / PAGE_SIZE)", async () => {
    vi.stubGlobal("fetch", mockListResponse(1302, []));
    const result = await fetchPokemonList(1);
    expect(result.totalPages).toBe(66);
  });

  it("maps results to PokemonListItem with constructed spriteUrl", async () => {
    vi.stubGlobal(
      "fetch",
      mockListResponse(1302, [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ])
    );
    const result = await fetchPokemonList(1);
    expect(result.pokemon[0]).toEqual({
      id: 1,
      name: "bulbasaur",
      spriteUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    });
  });

  it("throws when the response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await expect(fetchPokemonList(1)).rejects.toThrow(
      "Failed to fetch Pokémon list: 404"
    );
  });
});

describe("fetchPokemonInfinite", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls the correct URL for the given offset", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ count: 1302, results: [], next: null }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await fetchPokemonInfinite(40);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=40"
    );
  });

  it("returns the next URL from the API response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            count: 1302,
            results: [],
            next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20",
          }),
      })
    );
    const result = await fetchPokemonInfinite(0);
    expect(result.next).toBe("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
  });
});

describe("fetchPokemonDetail", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("throws when the response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await expect(fetchPokemonDetail("1")).rejects.toThrow(
      "Failed to fetch Pokémon detail: 404"
    );
  });
});
