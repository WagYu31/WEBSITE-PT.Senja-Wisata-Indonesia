"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { LayoutDashboard, Package, BookOpen, Users, LogOut, ChevronRight, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/owner", label: "Dashboard Owner", icon: LayoutDashboard },
    { href: "/owner/reports", label: "Laporan Keuangan", icon: BarChart3 },
    { href: "/admin", label: "Kelola Tour", icon: Package },
    { href: "/admin/bookings", label: "Kelola Booking", icon: BookOpen },
    { href: "/admin/users", label: "Kelola Users", icon: Users },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout, _hasHydrated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!_hasHydrated) return;
        if (!isAuthenticated) {
            router.push("/login");
        } else if (user?.role !== "owner") {
            router.push("/");
        }
    }, [isAuthenticated, user, router, _hasHydrated]);

    if (!_hasHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: '#2BBEE8', borderTopColor: 'transparent' }} />
                    <p className="text-sm text-slate-400">Memuat...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== "owner") return null;


    const currentNav = navItems.find((n) => pathname === n.href || (n.href !== "/owner" && n.href !== "/admin" && pathname.startsWith(n.href)));

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#1a1040] text-white shrink-0 sticky top-0 h-screen overflow-y-auto">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2">
                        <svg width="28" height="28" viewBox="0 0 38 38" fill="none">
                            <rect x="5" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                            <rect x="22" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                            <rect x="5" y="11" width="11" height="7" fill="#2BBEE8" />
                            <rect x="22" y="11" width="11" height="7" fill="#2BBEE8" />
                            <rect x="5" y="20" width="28" height="8" rx="4" fill="#2BBEE8" />
                            <rect x="10" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                            <rect x="20" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                        </svg>
                        <span className="font-bold text-white">Senja Wisata</span>
                    </Link>
                    <div className="mt-3">
                        <span className="badge bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.5 border border-amber-400/30">
                            👑 Owner Panel
                        </span>
                    </div>
                </div>

                {/* User info */}
                <div className="p-6 border-b border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                        {user?.name[0]}
                    </div>
                    <p className="font-semibold text-white">{user?.name}</p>
                    <p className="text-white/50 text-sm">{user?.email}</p>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all",
                                    active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon size={18} />
                                <span className="flex-1">{item.label}</span>
                                {active && <ChevronRight size={14} className="opacity-50" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => { logout(); router.push("/"); }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-amber-400 transition-all w-full text-sm font-semibold"
                    >
                        <LogOut size={18} /> Keluar
                    </button>
                </div>
            </aside>

            <main className="flex-1 min-w-0">
                {/* Top bar */}
                <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <div>
                        <h1 className="font-bold text-primary text-lg">
                            {currentNav?.label || "Owner Dashboard"}
                        </h1>
                        <p className="text-xs text-slate-400">PT. Senja Wisata Indonesia</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/" className="btn btn-outline btn-sm gap-2 text-xs">
                            Lihat Website
                        </Link>
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {user?.name[0]}
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
