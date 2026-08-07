// src/store/useRecentlyViewedStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/components/ui/ProductCard";

const MAX_RECENTLY_VIEWED = 8;

interface RecentlyViewedState {
  items: ProductType[];
  addItem: (item: ProductType) => void;
  clearAll: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          // Remove if already exists (will re-add at front)
          const filtered = state.items.filter((item) => item.id !== newItem.id);
          // Prepend and cap at MAX
          return { items: [newItem, ...filtered].slice(0, MAX_RECENTLY_VIEWED) };
        });
      },

      clearAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "recently-viewed-storage",
      skipHydration: true,
    }
  )
);
