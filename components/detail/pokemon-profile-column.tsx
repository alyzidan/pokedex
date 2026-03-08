import Image from "next/image";
import type { PokemonDetail } from "@/lib/types";
import TypeBadge from "@/components/type-badge";

interface Props {
  pokemon: Pick<PokemonDetail, "name" | "sprites" | "types" | "height" | "weight">;
}

export default function PokemonProfileColumn({ pokemon }: Props) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex h-52 w-52 items-center justify-center rounded-full bg-gray-100">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={180}
          height={180}
          className="h-44 w-44 object-contain"
          priority
        />
      </div>

      <div className="flex gap-2">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>

      <div className="grid w-full max-w-xs grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <p className="text-xs text-gray-500">📏 Height</p>
          <p className="text-lg font-bold text-gray-900">
            {(pokemon.height / 10).toFixed(1)} m
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <p className="text-xs text-gray-500">⚖️ Weight</p>
          <p className="text-lg font-bold text-gray-900">
            {(pokemon.weight / 10).toFixed(1)} kg
          </p>
        </div>
      </div>
    </div>
  );
}
