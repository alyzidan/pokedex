"use client";

import { usePokemonDetail } from "@/hooks/use-pokemon-detail";
import PokemonDetailCard from "./pokemon-detail-card";
import DetailSkeleton from "./skeleton/detail-skeleton";
import ErrorFallback from "./error-fallback";

interface Props {
  id: string;
}

export default function PokemonDetailView({ id }: Props) {
  const { data, isLoading, isError, error, refetch } = usePokemonDetail(id);

  if (isLoading) return <DetailSkeleton />;

  if (isError) {
    return (
      <ErrorFallback
        message={error instanceof Error ? error.message : "Failed to load Pokémon"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!data) return null;

  return <PokemonDetailCard pokemon={data} />;
}
