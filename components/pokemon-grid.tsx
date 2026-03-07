"use client";

import { useUIStore } from "@/store/ui-store";
import ViewToggle from "./view-toggle";
import PaginatedView from "./paginated-view";
import InfiniteView from "./infinite-view";

export default function PokemonGrid() {
  const viewMode = useUIStore((s) => s.viewMode);

  return (
    <div
      className={`min-h-screen px-4 py-8 transition-colors duration-300 sm:px-6 lg:px-8 ${
        viewMode === "pagination" ? "bg-blue-50" : "bg-green-50"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">⚡ Pokédex</h1>
          <p className="mt-1 text-sm text-gray-500">
            Discover and explore Pokémon with{" "}
            {viewMode === "pagination" ? "page controls" : "infinite scroll"}
          </p>
        </header>

        <ViewToggle />

        {viewMode === "pagination" ? <PaginatedView /> : <InfiniteView />}
      </div>
    </div>
  );
}
