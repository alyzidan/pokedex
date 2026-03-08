export function getErrorMessage(error: unknown, fallback = "Failed to load Pokémon"): string {
  return error instanceof Error ? error.message : fallback;
}

export function formatPokemonId(id: number): string {
  return String(id).padStart(3, "0");
}
