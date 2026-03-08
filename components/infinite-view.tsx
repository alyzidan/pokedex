"use client";

import { useMemo } from "react";
import { usePokemonInfinite } from "@/hooks/use-pokemon-infinite";
import PokemonCard from "./pokemon-card";
import CardSkeleton from "./skeleton/card-skeleton";
import LoadMoreButton from "./load-more-button";
import ErrorFallback from "./error-fallback";
import Spinner from "./spinner";
import { getErrorMessage } from "@/lib/utils";

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
        message={getErrorMessage(error)}
        onRetry={() => refetch()}
      />
    );
  }

  const allPokemon = useMemo(
    () => data?.pages.flatMap((page) => page.pokemon) ?? [],
    [data]
  );
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
            <Spinner />
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
