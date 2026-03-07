import { API_BASE, PAGE_SIZE } from "./constants";
import type { PokemonDetail, PokemonListItem } from "./types";

export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? parseInt(match[1], 10) : 0;
}

export function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function fetchPokemonList(page: number): Promise<{
  pokemon: PokemonListItem[];
  totalPages: number;
  totalCount: number;
}> {
  const offset = (page - 1) * PAGE_SIZE;
  const res = await fetch(`${API_BASE}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon list: ${res.status}`);

  const data = await res.json();
  const pokemon: PokemonListItem[] = data.results.map(
    (item: { name: string; url: string }) => {
      const id = extractIdFromUrl(item.url);
      return { id, name: item.name, spriteUrl: getSpriteUrl(id) };
    }
  );

  return {
    pokemon,
    totalPages: Math.ceil(data.count / PAGE_SIZE),
    totalCount: data.count,
  };
}

export async function fetchPokemonInfinite(offset: number): Promise<{
  pokemon: PokemonListItem[];
  next: string | null;
}> {
  const res = await fetch(`${API_BASE}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon list: ${res.status}`);

  const data = await res.json();
  const pokemon: PokemonListItem[] = data.results.map(
    (item: { name: string; url: string }) => {
      const id = extractIdFromUrl(item.url);
      return { id, name: item.name, spriteUrl: getSpriteUrl(id) };
    }
  );

  return { pokemon, next: data.next };
}

export async function fetchPokemonDetail(id: string): Promise<PokemonDetail> {
  const res = await fetch(`${API_BASE}/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon detail: ${res.status}`);
  return res.json();
}
