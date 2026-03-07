import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorFallback from "@/components/error-fallback";

describe("ErrorFallback", () => {
  it("renders the error message", () => {
    render(<ErrorFallback message="Network request failed" onRetry={() => {}} />);
    expect(screen.getByText("Network request failed")).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<ErrorFallback message="error" onRetry={() => {}} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders the retry button", () => {
    render(<ErrorFallback message="error" onRetry={() => {}} />);
    expect(screen.getByRole("button", { name: "Try Again" })).toBeInTheDocument();
  });

  it("calls onRetry when the retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorFallback message="error" onRetry={onRetry} />);
    await user.click(screen.getByRole("button", { name: "Try Again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("calls onRetry only once per click", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorFallback message="error" onRetry={onRetry} />);
    await user.click(screen.getByRole("button", { name: "Try Again" }));
    await user.click(screen.getByRole("button", { name: "Try Again" }));
    expect(onRetry).toHaveBeenCalledTimes(2);
  });
});
