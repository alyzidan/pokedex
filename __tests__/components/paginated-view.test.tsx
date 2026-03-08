import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PaginatedView from "@/components/paginated-view";

vi.mock("@/hooks/use-pokemon-list");
vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { usePokemonList } from "@/hooks/use-pokemon-list";
const mockUsePokemonList = vi.mocked(usePokemonList);

const baseMock = {
  data: undefined,
  isLoading: false,
  isError: false,
  error: null,
  refetch: vi.fn(),
  isSuccess: false,
  isPending: false,
  isPlaceholderData: false,
} as unknown as ReturnType<typeof usePokemonList>;

describe("PaginatedView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 20 skeletons while loading", () => {
    mockUsePokemonList.mockReturnValue({ ...baseMock, isLoading: true });

    const { container } = render(<PaginatedView />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons).toHaveLength(20);
  });

  it("renders the correct number of cards when data loads", () => {
    mockUsePokemonList.mockReturnValue({
      ...baseMock,
      isLoading: false,
      data: {
        pokemon: [
          { id: 1, name: "bulbasaur", spriteUrl: "https://example.com/1.png" },
          { id: 4, name: "charmander", spriteUrl: "https://example.com/4.png" },
        ],
        totalPages: 66,
        totalCount: 1302,
      },
    });

    render(<PaginatedView />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  it("renders ErrorFallback with message on error", () => {
    mockUsePokemonList.mockReturnValue({
      ...baseMock,
      isError: true,
      error: new Error("Network error"),
    });

    render(<PaginatedView />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try Again" })).toBeInTheDocument();
  });
});
