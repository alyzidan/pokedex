import type { PokemonDetail } from "@/lib/types";
import StatBar from "@/components/stat-bar";
import { formatStatName } from "@/lib/utils";

interface Props {
  pokemon: Pick<PokemonDetail, "stats" | "abilities" | "base_experience">;
}

export default function PokemonStatsColumn({ pokemon }: Props) {
  return (
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
  );
}
