"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import { Home, Package, Heart, User, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/trips", label: "My Trips", icon: Package },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
    { href: "/dashboard/profile", label: "Profil", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout, _hasHydrated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (_hasHydrated && !isAuthenticated) router.push("/login");
    }, [_hasHydrated, isAuthenticated, router]);

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // Wait for hydration before rendering
    if (!_hasHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin w-8 h-8 border-3 border-accent border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const SidebarContent = () => (
        <>
            <div className="p-5 border-b border-white/10">
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
            </div>

            {/* User info */}
            <div className="p-5 border-b border-white/10">
                <div className="w-12 h-12 bg-blue/30 rounded-full flex items-center justify-center text-blue font-bold text-xl mb-3">
                    {user?.name[0]}
                </div>
                <p className="font-semibold text-white">{user?.name}</p>
                <p className="text-white/50 text-sm">{user?.email}</p>
                <span className="badge bg-blue/20 text-blue text-[10px] mt-2">Traveler</span>
            </div>

            <nav className="flex-1 p-3 flex flex-col gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all",
                            pathname === item.href ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-3 border-t border-white/10">
                <button
                    onClick={() => { logout(); router.push("/"); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-accent transition-all w-full text-sm font-semibold"
                >
                    <LogOut size={18} /> Keluar
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* ── Desktop Sidebar ── */}
            <aside className="hidden lg:flex flex-col w-64 text-white shrink-0 sticky top-0 h-screen overflow-y-auto" style={{ backgroundColor: '#05073C' }}>
                <SidebarContent />
            </aside>

            {/* ── Mobile Overlay ── */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ── Mobile Sidebar (slide-in) ── */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full w-72 z-50 flex flex-col text-white transition-transform duration-300 lg:hidden",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
                style={{ backgroundColor: '#05073C' }}
            >
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 p-1 text-white/60 hover:text-white"
                >
                    <X size={22} />
                </button>
                <SidebarContent />
            </aside>

            <main className="flex-1 min-w-0 pb-20 lg:pb-0">
                {/* ── Top bar ── */}
                <header className="bg-white border-b border-slate-100 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-primary"
                        >
                            <Menu size={22} />
                        </button>
                        <h1 className="font-bold text-primary text-sm lg:text-base">
                            {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
                        </h1>
                    </div>
                    <Link href="/tours" className="btn btn-primary btn-sm gap-2 text-xs lg:text-sm">
                        <Package size={15} /> Cari Tour
                    </Link>
                </header>

                <div className="p-4 lg:p-8">{children}</div>
            </main>

            {/* ── Mobile Bottom Navigation ── */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-around py-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all text-[10px] font-semibold",
                                pathname === item.href
                                    ? "text-accent"
                                    : "text-slate-400 hover:text-primary"
                            )}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => { logout(); router.push("/"); }}
                        className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all text-[10px] font-semibold text-slate-400 hover:text-accent"
                    >
                        <LogOut size={20} />
                        Keluar
                    </button>
                </div>
            </nav>
        </div>
    );
}
