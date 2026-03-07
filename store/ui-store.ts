import { create } from "zustand";

interface UIStore {
  viewMode: "pagination" | "infinite";
  setViewMode: (mode: "pagination" | "infinite") => void;
}

export const useUIStore = create<UIStore>((set) => ({
  viewMode: "pagination",
  setViewMode: (mode) => set({ viewMode: mode }),
}));
