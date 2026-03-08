"use client";

import { useUIStore } from "@/store/ui-store";

export default function ViewToggle() {
  const { viewMode, setViewMode } = useUIStore();

  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      <button
        onClick={() => setViewMode("pagination")}
        className={`min-h-[44px] rounded px-5 py-1 text-sm font-medium transition-colors ${
          viewMode === "pagination"
            ? "bg-gray-900 text-white"
            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        Page Controls
      </button>
      <button
        onClick={() => setViewMode("infinite")}
        className={`min-h-[44px] rounded px-5 py-1 text-sm font-medium transition-colors ${
          viewMode === "infinite"
            ? "bg-gray-900 text-white"
            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        Infinite Scroll
      </button>
    </div>
  );
}
