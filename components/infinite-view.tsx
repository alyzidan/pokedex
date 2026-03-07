"use client";

import { usePokemonInfinite } from "@/hooks/use-pokemon-infinite";
import PokemonCard from "./pokemon-card";
import CardSkeleton from "./skeleton/card-skeleton";
import LoadMoreButton from "./load-more-button";
import ErrorFallback from "./error-fallback";

export default function InfiniteView() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonInfinite();

  if (isError) {
    return (
      <ErrorFallback
        message={error instanceof Error ? error.message : "Failed to load Pokémon"}
        onRetry={() => refetch()}
      />
    );
  }

  const allPokemon = data?.pages.flatMap((page) => page.pokemon) ?? [];
  const totalLoaded = allPokemon.length;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
          : allPokemon.map((p) => <PokemonCard key={p.id} {...p} />)}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Loading more Pokémon...
          </div>
        )}

        {hasNextPage && !isFetchingNextPage && (
          <LoadMoreButton onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} />
        )}

        {!isLoading && (
          <p className="text-xs text-gray-400">Showing {totalLoaded} Pokémon</p>
        )}
      </div>
    </div>
  );
}
