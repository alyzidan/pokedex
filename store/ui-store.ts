import { create } from "zustand";

interface UIStore {
  viewMode: "pagination" | "infinite";
  setViewMode: (mode: "pagination" | "infinite") => void;
  page: number;
  setPage: (page: number) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  viewMode: "pagination",
  setViewMode: (mode) => set({ viewMode: mode }),
  page: 1,
  setPage: (page) => set({ page }),
}));
