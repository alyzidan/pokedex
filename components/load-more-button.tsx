"use client";

interface Props {
  onClick: () => void;
  isLoading: boolean;
}

export default function LoadMoreButton({ onClick, isLoading }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white
                 transition-colors hover:bg-gray-800 disabled:opacity-60"
    >
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
}
