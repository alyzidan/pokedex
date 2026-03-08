"use client";

import { useUIStore } from "@/store/ui-store";

const ACTIVE_CLASSES = "bg-gray-900 text-white";
const INACTIVE_CLASSES = "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50";

export default function ViewToggle() {
  const { viewMode, setViewMode } = useUIStore();

  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      <button
        onClick={() => setViewMode("pagination")}
        className={`min-h-[44px] rounded px-5 py-1 text-sm font-medium transition-colors ${
          viewMode === "pagination" ? ACTIVE_CLASSES : INACTIVE_CLASSES
        }`}
      >
        Page Controls
      </button>
      <button
        onClick={() => setViewMode("infinite")}
        className={`min-h-[44px] rounded px-5 py-1 text-sm font-medium transition-colors ${
          viewMode === "infinite" ? ACTIVE_CLASSES : INACTIVE_CLASSES
        }`}
      >
        Infinite Scroll
      </button>
    </div>
  );
}
