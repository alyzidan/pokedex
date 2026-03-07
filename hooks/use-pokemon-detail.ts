import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail } from "@/lib/api";

export function usePokemonDetail(id: string) {
  return useQuery({
    queryKey: ["pokemon", "detail", id],
    queryFn: () => fetchPokemonDetail(id),
  });
}
