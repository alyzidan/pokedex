import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ViewToggle from "@/components/view-toggle";
import { useUIStore } from "@/store/ui-store";

describe("ViewToggle", () => {
  beforeEach(() => {
    useUIStore.setState({ viewMode: "pagination" });
  });

  it("renders both mode labels", () => {
    render(<ViewToggle />);
    expect(screen.getByText("Page Controls")).toBeInTheDocument();
    expect(screen.getByText("Infinite Scroll")).toBeInTheDocument();
  });

  it("applies the active style to Page Controls by default", () => {
    render(<ViewToggle />);
    expect(screen.getByText("Page Controls")).toHaveClass("bg-gray-900");
    expect(screen.getByText("Infinite Scroll")).not.toHaveClass("bg-gray-900");
  });

  it("applies the active style to Infinite Scroll when that mode is active", () => {
    useUIStore.setState({ viewMode: "infinite" });
    render(<ViewToggle />);
    expect(screen.getByText("Infinite Scroll")).toHaveClass("bg-gray-900");
    expect(screen.getByText("Page Controls")).not.toHaveClass("bg-gray-900");
  });

  it("sets viewMode to infinite when Infinite Scroll is clicked", async () => {
    const user = userEvent.setup();
    render(<ViewToggle />);
    await user.click(screen.getByText("Infinite Scroll"));
    expect(useUIStore.getState().viewMode).toBe("infinite");
  });

  it("sets viewMode to pagination when Page Controls is clicked", async () => {
    useUIStore.setState({ viewMode: "infinite" });
    const user = userEvent.setup();
    render(<ViewToggle />);
    await user.click(screen.getByText("Page Controls"));
    expect(useUIStore.getState().viewMode).toBe("pagination");
  });
});
