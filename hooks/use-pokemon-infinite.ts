import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonInfinite } from "@/lib/api";
import { PAGE_SIZE } from "@/lib/constants";

export function usePokemonInfinite() {
  return useInfiniteQuery({
    queryKey: ["pokemon", "infinite"],
    queryFn: ({ pageParam }) => fetchPokemonInfinite(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return parseInt(url.searchParams.get("offset") ?? "0", 10);
    },
  });
}
