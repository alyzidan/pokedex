"use client";

import { usePokemonList } from "@/hooks/use-pokemon-list";
import PokemonCard from "./pokemon-card";
import CardSkeleton from "./skeleton/card-skeleton";
import PaginationControls from "./pagination-controls";
import ErrorFallback from "./error-fallback";
import { getErrorMessage } from "@/lib/utils";
import { useState } from "react";

export default function PaginatedView() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = usePokemonList(page);

  if (isError) {
    return (
      <ErrorFallback
        message={getErrorMessage(error)}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
          : data?.pokemon.map((p) => <PokemonCard key={p.id} {...p} />)}
      </div>

      {data && (
        <PaginationControls
          page={page}
          totalPages={data.totalPages}
          totalCount={data.totalCount}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
