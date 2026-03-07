import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "@/lib/api";

export function usePokemonList(page: number) {
  return useQuery({
    queryKey: ["pokemon", "list", page],
    queryFn: () => fetchPokemonList(page),
  });
}
