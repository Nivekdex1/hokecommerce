// src/store/useWishlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/components/ui/ProductCard";

interface WishlistState {
  items: ProductType[];
  
  // Actions
  addItem: (item: ProductType) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: ProductType) => void;
  clearWishlist: () => void;
  
  // Computed (can be derived in components, but convenient here)
  isInWishlist: (id: string) => boolean;
  totalItems: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const exists = state.items.some((item) => item.id === newItem.id);
          if (exists) return state; // Avoid duplicates
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      toggleItem: (item) => {
        const state = get();
        if (state.isInWishlist(item.id)) {
          state.removeItem(item.id);
        } else {
          state.addItem(item);
        }
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      totalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: "wishlist-storage",
      skipHydration: true, // Handle hydration carefully in Next.js components
    }
  )
);
