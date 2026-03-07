import Image from "next/image";
import type { PokemonDetail } from "@/lib/types";
import TypeBadge from "./type-badge";
import StatBar from "./stat-bar";

function formatStatName(name: string): string {
  const map: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    speed: "Speed",
  };
  return map[name] ?? name;
}

interface Props {
  pokemon: PokemonDetail;
}

export default function PokemonDetailCard({ pokemon }: Props) {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6 text-center text-white">
        <h1 className="text-2xl font-bold capitalize">⚡ {pokemon.name}</h1>
        <p className="text-sm text-white/80">#{String(pokemon.id).padStart(3, "0")}</p>
      </div>

      <div className="grid gap-8 p-8 md:grid-cols-2">
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

        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-lg font-bold text-gray-900">Base Stats</h2>
            <div className="space-y-3">
              {pokemon.stats.map((s) => (
                <StatBar
                  key={s.stat.name}
                  label={formatStatName(s.stat.name)}
                  value={s.base_stat}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-gray-900">Abilities</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a) => (
                <span
                  key={a.ability.name}
                  className="rounded-full border border-gray-200 bg-gray-50
                             px-3 py-1 text-sm text-gray-700"
                >
                  {a.ability.name}
                  {a.is_hidden && (
                    <span className="ml-1 text-xs text-gray-400">(Hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">Base Experience</h2>
            <p className="text-xl font-bold text-purple-500">
              {pokemon.base_experience} XP
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
