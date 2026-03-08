export interface PokemonListItem {
  id: number;
  name: string;
  spriteUrl: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
}

export interface PokeApiResultItem {
  name: string;
  url: string;
}

export interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiResultItem[];
}

export type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export type PokemonTypeName =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";
