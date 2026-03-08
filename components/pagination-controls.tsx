"use client";

import { useMemo } from "react";

interface Props {
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 2) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function PaginationControls({ page, totalPages, totalCount, onPageChange }: Props) {
  const pages = useMemo(() => getPageNumbers(page, totalPages), [page, totalPages]);

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex min-h-[44px] items-center gap-1 px-3 py-2 text-sm text-gray-600
                     transition-colors hover:text-gray-900
                     disabled:cursor-not-allowed disabled:opacity-40"
        >
          ‹ Previous
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-sm text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`h-11 w-11 rounded-lg text-sm font-medium transition-colors sm:h-8 sm:w-8 ${
                p === page
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex min-h-[44px] items-center gap-1 px-3 py-2 text-sm text-gray-600
                     transition-colors hover:text-gray-900
                     disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next ›
        </button>
      </div>

      <p className="text-xs text-gray-400">
        Page {page} of {totalPages} ({totalCount} Pokémon total)
      </p>
    </div>
  );
}
