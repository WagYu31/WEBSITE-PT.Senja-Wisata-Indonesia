"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
    items: number[];
    toggle: (id: number, userId?: string) => void;
    has: (id: number) => boolean;
    clear: () => void;
    syncFromDB: (userId: string) => Promise<void>;
    _synced: boolean;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            _synced: false,

            toggle: (id, userId) => {
                const isAdding = !get().items.includes(id);
                // Update local state immediately
                set((s) => ({
                    items: s.items.includes(id) ? s.items.filter((i) => i !== id) : [...s.items, id],
                }));

                // Sync to DB if userId is available
                if (userId) {
                    if (isAdding) {
                        fetch("/api/wishlist", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ userId, tourId: id }),
                        }).catch(console.error);
                    } else {
                        fetch("/api/wishlist", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ userId, tourId: id }),
                        }).catch(console.error);
                    }
                }
            },

            has: (id) => get().items.includes(id),
            clear: () => set({ items: [], _synced: false }),

            syncFromDB: async (userId) => {
                if (get()._synced) return;
                try {
                    const res = await fetch(`/api/wishlist?userId=${userId}`);
                    const data = await res.json();
                    if (data.wishlists && data.wishlists.length > 0) {
                        const dbIds = data.wishlists.map((w: { tour_id: number }) => w.tour_id);
                        // Merge: keep local items + add DB items
                        const merged = [...new Set([...get().items, ...dbIds])];
                        set({ items: merged, _synced: true });
                    } else {
                        set({ _synced: true });
                    }
                } catch {
                    set({ _synced: true });
                }
            },
        }),
        { name: "sw-wishlist" }
    )
);
