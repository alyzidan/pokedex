import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import InfiniteView from "@/components/infinite-view";

vi.mock("@/hooks/use-pokemon-infinite");
vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { usePokemonInfinite } from "@/hooks/use-pokemon-infinite";
const mockUsePokemonInfinite = vi.mocked(usePokemonInfinite);

const baseMock = {
  data: undefined,
  isLoading: false,
  isError: false,
  error: null,
  refetch: vi.fn(),
  fetchNextPage: vi.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
  isSuccess: false,
} as unknown as ReturnType<typeof usePokemonInfinite>;

describe("InfiniteView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 20 skeletons while loading", () => {
    mockUsePokemonInfinite.mockReturnValue({ ...baseMock, isLoading: true });

    const { container } = render(<InfiniteView />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons).toHaveLength(20);
  });

  it("renders the correct number of cards when data loads", () => {
    mockUsePokemonInfinite.mockReturnValue({
      ...baseMock,
      isLoading: false,
      data: {
        pages: [
          {
            pokemon: [
              { id: 1, name: "bulbasaur", spriteUrl: "https://example.com/1.png" },
              { id: 4, name: "charmander", spriteUrl: "https://example.com/4.png" },
            ],
            next: null,
          },
        ],
        pageParams: [0],
      },
    });

    render(<InfiniteView />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.getByText("Showing 2 Pokémon")).toBeInTheDocument();
  });

  it("renders ErrorFallback with message on error", () => {
    mockUsePokemonInfinite.mockReturnValue({
      ...baseMock,
      isError: true,
      error: new Error("Failed to load Pokémon: 500"),
    });

    render(<InfiniteView />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Failed to load Pokémon: 500")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try Again" })).toBeInTheDocument();
  });
});
