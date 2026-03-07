import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationControls, { getPageNumbers } from "@/components/pagination-controls";

describe("getPageNumbers", () => {
  it("returns all page numbers when total is 7 or fewer", () => {
    expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageNumbers(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("places ellipsis before the last page when current is near the start", () => {
    expect(getPageNumbers(1, 66)).toEqual([1, 2, 3, 4, 5, "...", 66]);
    expect(getPageNumbers(3, 20)).toEqual([1, 2, 3, 4, 5, "...", 20]);
  });

  it("places ellipsis after the first page when current is near the end", () => {
    expect(getPageNumbers(66, 66)).toEqual([1, "...", 62, 63, 64, 65, 66]);
    expect(getPageNumbers(64, 66)).toEqual([1, "...", 62, 63, 64, 65, 66]);
  });

  it("places ellipsis on both sides when current is in the middle", () => {
    expect(getPageNumbers(10, 66)).toEqual([1, "...", 9, 10, 11, "...", 66]);
    expect(getPageNumbers(33, 66)).toEqual([1, "...", 32, 33, 34, "...", 66]);
  });
});

describe("PaginationControls", () => {
  it("disables the Previous button on the first page", () => {
    render(
      <PaginationControls page={1} totalPages={66} totalCount={1302} onPageChange={() => {}} />
    );
    expect(screen.getByText("‹ Previous")).toBeDisabled();
  });

  it("disables the Next button on the last page", () => {
    render(
      <PaginationControls page={66} totalPages={66} totalCount={1302} onPageChange={() => {}} />
    );
    expect(screen.getByText("Next ›")).toBeDisabled();
  });

  it("enables both buttons on a middle page", () => {
    render(
      <PaginationControls page={10} totalPages={66} totalCount={1302} onPageChange={() => {}} />
    );
    expect(screen.getByText("‹ Previous")).not.toBeDisabled();
    expect(screen.getByText("Next ›")).not.toBeDisabled();
  });

  it("calls onPageChange with page - 1 when Previous is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <PaginationControls page={5} totalPages={66} totalCount={1302} onPageChange={onPageChange} />
    );
    await user.click(screen.getByText("‹ Previous"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with page + 1 when Next is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <PaginationControls page={5} totalPages={66} totalCount={1302} onPageChange={onPageChange} />
    );
    await user.click(screen.getByText("Next ›"));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("calls onPageChange with the correct page number when a page button is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <PaginationControls page={1} totalPages={66} totalCount={1302} onPageChange={onPageChange} />
    );
    await user.click(screen.getByText("2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("renders the footer with page and total count", () => {
    render(
      <PaginationControls page={3} totalPages={66} totalCount={1302} onPageChange={() => {}} />
    );
    expect(screen.getByText("Page 3 of 66 (1302 Pokémon total)")).toBeInTheDocument();
  });
});
