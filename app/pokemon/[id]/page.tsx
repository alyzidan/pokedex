import BackLink from "@/components/back-link";
import PokemonDetailView from "@/components/pokemon-detail-view";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PokemonPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-8">
      <div className="mx-auto mb-6 max-w-4xl">
        <BackLink />
      </div>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <PokemonDetailView id={id} />
      </div>
    </div>
  );
}
