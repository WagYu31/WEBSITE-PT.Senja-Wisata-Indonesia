"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import {
    Home, Package, Heart, User, LogOut, Menu, X,
    ChevronLeft, ChevronRight, Moon, Sun, Bell
} from "lucide-react";
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (_hasHydrated && !isAuthenticated) router.push("/login");
    }, [_hasHydrated, isAuthenticated, router]);

    useEffect(() => { setMobileOpen(false); }, [pathname]);

    // Load dark mode preference
    useEffect(() => {
        const saved = localStorage.getItem("sw-dark-mode");
        if (saved === "true") setDark(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("sw-dark-mode", String(dark));
    }, [dark]);

    if (!_hasHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin w-8 h-8 border-3 border-accent border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const sidebarBg = dark ? "#0f172a" : "#05073C";
    const mainBg = dark ? "#1e293b" : "#f8fafc";
    const cardBg = dark ? "#334155" : "#ffffff";
    const textMain = dark ? "#f1f5f9" : "#05073C";
    const textSub = dark ? "#94a3b8" : "#64748b";
    const borderColor = dark ? "#475569" : "#e2e8f0";
    const topBarBg = dark ? "#1e293b" : "#ffffff";

    const SidebarContent = () => (
        <>
            <div className={cn("p-4 border-b border-white/10 flex items-center", collapsed ? "justify-center" : "justify-between")}>
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
                    {!collapsed && <span className="font-bold text-white text-sm">Senja Wisata</span>}
                </Link>
                {!collapsed && (
                    <button onClick={() => setCollapsed(true)} className="hidden lg:flex p-1 rounded-md text-white/40 hover:text-white/80 hover:bg-white/10 transition-all">
                        <ChevronLeft size={16} />
                    </button>
                )}
            </div>

            {/* User info */}
            <div className={cn("p-4 border-b border-white/10", collapsed ? "flex justify-center" : "")}>
                <div className={cn(
                    "rounded-full flex items-center justify-center text-white font-bold shrink-0",
                    collapsed ? "w-9 h-9 text-sm" : "w-11 h-11 text-lg mb-2"
                )} style={{ background: "linear-gradient(135deg, #2BBEE8, #05073C)" }}>
                    {user?.name[0]}
                </div>
                {!collapsed && (
                    <div>
                        <p className="font-semibold text-white text-sm">{user?.name}</p>
                        <p className="text-white/40 text-xs truncate">{user?.email}</p>
                    </div>
                )}
            </div>

            <nav className="flex-1 p-2 flex flex-col gap-0.5">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                            "flex items-center gap-3 rounded-xl font-semibold text-sm transition-all",
                            collapsed ? "justify-center px-2 py-3" : "px-4 py-2.5",
                            pathname === item.href
                                ? "bg-white/15 text-white shadow-sm"
                                : "text-white/50 hover:bg-white/8 hover:text-white"
                        )}
                    >
                        <item.icon size={18} />
                        {!collapsed && item.label}
                    </Link>
                ))}
            </nav>

            {/* Dark mode toggle */}
            <div className={cn("px-3 py-2 border-t border-white/10", collapsed ? "flex justify-center" : "")}>
                <button
                    onClick={() => setDark(!dark)}
                    title={dark ? "Light Mode" : "Dark Mode"}
                    className={cn(
                        "flex items-center gap-3 rounded-xl text-white/50 hover:bg-white/8 hover:text-white transition-all w-full text-sm font-semibold",
                        collapsed ? "justify-center px-2 py-3" : "px-4 py-2.5"
                    )}
                >
                    {dark ? <Sun size={18} /> : <Moon size={18} />}
                    {!collapsed && (dark ? "Light Mode" : "Dark Mode")}
                </button>
            </div>

            {/* Collapse toggle (when collapsed) */}
            {collapsed && (
                <div className="px-3 py-1 hidden lg:flex justify-center">
                    <button onClick={() => setCollapsed(false)} className="p-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-all">
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            <div className={cn("p-2 border-t border-white/10", collapsed ? "flex justify-center" : "")}>
                <button
                    onClick={() => { logout(); router.push("/"); }}
                    className={cn(
                        "flex items-center gap-3 rounded-xl text-white/50 hover:bg-red-500/20 hover:text-red-400 transition-all w-full text-sm font-semibold",
                        collapsed ? "justify-center px-2 py-3" : "px-4 py-2.5"
                    )}
                >
                    <LogOut size={18} />
                    {!collapsed && "Keluar"}
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: mainBg, color: textMain }}>
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex flex-col text-white shrink-0 sticky top-0 h-screen overflow-y-auto transition-all duration-300",
                    collapsed ? "w-[68px]" : "w-60"
                )}
                style={{ backgroundColor: sidebarBg }}
            >
                <SidebarContent />
            </aside>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full w-72 z-50 flex flex-col text-white transition-transform duration-300 lg:hidden",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
                style={{ backgroundColor: sidebarBg }}
            >
                <button
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-4 right-4 p-1 text-white/60 hover:text-white"
                >
                    <X size={22} />
                </button>
                <SidebarContent />
            </aside>

            <main className="flex-1 min-w-0 pb-20 lg:pb-0">
                {/* Top bar */}
                <header
                    className="px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-10"
                    style={{
                        backgroundColor: topBarBg,
                        borderBottom: `1px solid ${borderColor}`,
                        boxShadow: dark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.05)"
                    }}
                >
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100/50"
                            style={{ color: textMain }}
                        >
                            <Menu size={22} />
                        </button>
                        <div>
                            <h1 className="font-bold text-sm lg:text-base" style={{ color: textMain }}>
                                {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
                            </h1>
                            <p className="text-xs hidden sm:block" style={{ color: textSub }}>
                                {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl hover:bg-slate-100/50 relative transition-all" style={{ color: textSub }}>
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <Link
                            href="/tours"
                            className="btn btn-primary btn-sm gap-2 text-xs lg:text-sm"
                            style={{ background: "linear-gradient(135deg, #2BBEE8, #05073C)" }}
                        >
                            <Package size={15} /> Cari Tour
                        </Link>
                    </div>
                </header>

                <div className="p-4 lg:p-6">{children}</div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-30 lg:hidden"
                style={{
                    backgroundColor: dark ? "#1e293b" : "#ffffff",
                    borderTop: `1px solid ${borderColor}`,
                    boxShadow: "0 -4px 20px rgba(0,0,0,0.08)"
                }}
            >
                <div className="flex items-center justify-around py-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all text-[10px] font-semibold",
                                pathname === item.href ? "text-[#2BBEE8]" : ""
                            )}
                            style={{ color: pathname === item.href ? "#2BBEE8" : textSub }}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => { logout(); router.push("/"); }}
                        className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all text-[10px] font-semibold"
                        style={{ color: textSub }}
                    >
                        <LogOut size={20} />
                        Keluar
                    </button>
                </div>
            </nav>
        </div>
    );
}
