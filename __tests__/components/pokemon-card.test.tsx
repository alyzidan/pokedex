import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonCard from "@/components/pokemon-card";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const defaultProps = {
  id: 1,
  name: "bulbasaur",
  spriteUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
};

describe("PokemonCard", () => {
  it("renders the pokemon name", () => {
    render(<PokemonCard {...defaultProps} />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("renders the ID formatted with leading zeros", () => {
    render(<PokemonCard {...defaultProps} />);
    expect(screen.getByText("#001")).toBeInTheDocument();
  });

  it("does not render an unformatted ID", () => {
    render(<PokemonCard {...defaultProps} />);
    expect(screen.queryByText("#1")).not.toBeInTheDocument();
  });

  it("renders the sprite image with the pokemon name as alt text", () => {
    render(<PokemonCard {...defaultProps} />);
    expect(screen.getByAltText("bulbasaur")).toBeInTheDocument();
  });

  it("links to the correct detail page", () => {
    render(<PokemonCard {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokemon/1");
  });

  it("formats a three-digit ID without padding", () => {
    render(<PokemonCard {...defaultProps} id={151} name="mew" />);
    expect(screen.getByText("#151")).toBeInTheDocument();
  });

  it("formats a two-digit ID with one leading zero", () => {
    render(<PokemonCard {...defaultProps} id={25} name="pikachu" />);
    expect(screen.getByText("#025")).toBeInTheDocument();
  });
});
