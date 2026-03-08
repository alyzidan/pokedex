import { formatPokemonId } from "@/lib/utils";

interface Props {
  name: string;
  id: number;
}

export default function PokemonDetailHeader({ name, id }: Props) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6 text-center text-white">
      <h1 className="text-2xl font-bold capitalize">⚡ {name}</h1>
      <p className="text-sm text-white/80">#{formatPokemonId(id)}</p>
    </div>
  );
}
