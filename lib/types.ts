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
