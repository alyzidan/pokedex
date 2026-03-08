import type { StatName } from "./types";

export function getErrorMessage(error: unknown, fallback = "Failed to load Pokémon"): string {
  return error instanceof Error ? error.message : fallback;
}

export function formatPokemonId(id: number): string {
  return String(id).padStart(3, "0");
}

export function formatStatName(name: string): string {
  const map: Record<StatName, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    speed: "Speed",
  };
  return map[name as StatName] ?? name;
}
