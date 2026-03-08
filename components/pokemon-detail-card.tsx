import type { PokemonDetail } from "@/lib/types";
import PokemonDetailHeader from "./detail/pokemon-detail-header";
import PokemonProfileColumn from "./detail/pokemon-profile-column";
import PokemonStatsColumn from "./detail/pokemon-stats-column";

interface Props {
  pokemon: PokemonDetail;
}

export default function PokemonDetailCard({ pokemon }: Props) {
  return (
    <>
      <PokemonDetailHeader name={pokemon.name} id={pokemon.id} />

      <div className="grid gap-8 p-8 md:grid-cols-2">
        <PokemonProfileColumn pokemon={pokemon} />
        <PokemonStatsColumn pokemon={pokemon} />
      </div>
    </>
  );
}
