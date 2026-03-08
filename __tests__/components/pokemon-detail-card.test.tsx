import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonDetailCard from "@/components/pokemon-detail-card";
import type { PokemonDetail } from "@/lib/types";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockPokemon: PokemonDetail = {
  id: 6,
  name: "charizard",
  height: 17,
  weight: 905,
  base_experience: 240,
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/charizard.png",
      },
    },
  },
  types: [
    { type: { name: "fire" } },
    { type: { name: "flying" } },
  ],
  stats: [
    { base_stat: 78, stat: { name: "hp" } },
    { base_stat: 84, stat: { name: "attack" } },
    { base_stat: 78, stat: { name: "defense" } },
    { base_stat: 109, stat: { name: "special-attack" } },
    { base_stat: 85, stat: { name: "special-defense" } },
    { base_stat: 100, stat: { name: "speed" } },
  ],
  abilities: [
    { ability: { name: "blaze" }, is_hidden: false },
    { ability: { name: "solar-power" }, is_hidden: true },
  ],
};

describe("PokemonDetailCard", () => {
  it("renders the pokemon name", () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />);
    expect(screen.getByText(/charizard/i)).toBeInTheDocument();
  });

  it("renders the formatted ID", () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />);
    expect(screen.getByText("#006")).toBeInTheDocument();
  });

  it("renders all type badges", () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />);
    expect(screen.getByText("fire")).toBeInTheDocument();
    expect(screen.getByText("flying")).toBeInTheDocument();
  });

  it("renders all 6 stat bars with formatted labels", () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />);
    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("Attack")).toBeInTheDocument();
    expect(screen.getByText("Defense")).toBeInTheDocument();
    expect(screen.getByText("Sp. Attack")).toBeInTheDocument();
    expect(screen.getByText("Sp. Defense")).toBeInTheDocument();
    expect(screen.getByText("Speed")).toBeInTheDocument();
  });

  it("renders abilities with a hidden tag on hidden abilities", () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />);
    expect(screen.getByText("blaze")).toBeInTheDocument();
    expect(screen.getByText("solar-power")).toBeInTheDocument();
    expect(screen.getByText("(Hidden)")).toBeInTheDocument();
  });

  it("renders height and weight with correct unit conversions", () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />);
    expect(screen.getByText("1.7 m")).toBeInTheDocument();
    expect(screen.getByText("90.5 kg")).toBeInTheDocument();
  });

  it("renders the base experience", () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />);
    expect(screen.getByText("240 XP")).toBeInTheDocument();
  });

  it("renders the sprite image with alt text", () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />);
    expect(screen.getByAltText("charizard")).toBeInTheDocument();
  });
});
