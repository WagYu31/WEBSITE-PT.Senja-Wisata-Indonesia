"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

// Demo accounts
const DEMO_USERS: (User & { password: string })[] = [
    { id: "1", name: "Pak Bowo", email: "owner@senja.com", password: "owner123", role: "owner" },
    { id: "2", name: "Admin Senja", email: "admin@senja.com", password: "admin123", role: "admin" },
    { id: "3", name: "Budi Santoso", email: "user@senja.com", password: "user123", role: "user" },
];

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    _hasHydrated: boolean;
    setHasHydrated: (val: boolean) => void;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            _hasHydrated: false,
            setHasHydrated: (val) => set({ _hasHydrated: val }),
            login: async (email, password) => {
                await new Promise((r) => setTimeout(r, 800));
                const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
                if (found) {
                    const { password: _, ...user } = found;
                    set({ user, isAuthenticated: true });
                    return { success: true };
                }
                return { success: false, error: "Email atau password salah" };
            },
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: "sw-auth",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
