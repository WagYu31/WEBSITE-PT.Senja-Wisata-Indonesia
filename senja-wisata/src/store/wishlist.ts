"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
    items: number[];
    toggle: (id: number) => void;
    has: (id: number) => boolean;
    clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            toggle: (id) =>
                set((s) => ({
                    items: s.items.includes(id) ? s.items.filter((i) => i !== id) : [...s.items, id],
                })),
            has: (id) => get().items.includes(id),
            clear: () => set({ items: [] }),
        }),
        { name: "sw-wishlist" }
    )
);
