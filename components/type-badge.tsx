import React from "react";
import type { PokemonTypeName } from "@/lib/types";

const TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal:   "bg-gray-400 text-white",
  fire:     "bg-red-500 text-white",
  water:    "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-gray-900",
  grass:    "bg-green-500 text-white",
  ice:      "bg-cyan-300 text-gray-900",
  fighting: "bg-red-700 text-white",
  poison:   "bg-purple-500 text-white",
  ground:   "bg-amber-600 text-white",
  flying:   "bg-indigo-300 text-white",
  psychic:  "bg-pink-500 text-white",
  bug:      "bg-lime-500 text-white",
  rock:     "bg-amber-800 text-white",
  ghost:    "bg-purple-700 text-white",
  dragon:   "bg-indigo-600 text-white",
  dark:     "bg-gray-800 text-white",
  steel:    "bg-gray-400 text-white",
  fairy:    "bg-pink-300 text-gray-900",
};

interface Props {
  type: string;
}

function TypeBadge({ type }: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
        TYPE_COLORS[type as PokemonTypeName] ?? "bg-gray-300 text-gray-800"
      }`}
    >
      {type}
    </span>
  );
}

export default React.memo(TypeBadge);
