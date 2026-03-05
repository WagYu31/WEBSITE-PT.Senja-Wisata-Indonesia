"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState, useCallback } from "react";
import {
    LayoutDashboard, Package, BookOpen, Users,
    LogOut, ChevronRight, Menu, X, Bell, Crown, Settings, MessageSquare, Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/tours", label: "Kelola Tour", icon: Package, exact: false },
    { href: "/admin/bookings", label: "Kelola Booking", icon: BookOpen, exact: false },
    { href: "/admin/users", label: "Kelola Users", icon: Users, exact: false },
    { href: "/admin/chats", label: "Live Chat", icon: MessageSquare, exact: false },
    { href: "/admin/newsletter", label: "Newsletter", icon: Mail, exact: false },
    { href: "/admin/settings", label: "Pengaturan Web", icon: Settings, exact: false },
];


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout, _hasHydrated } = useAuthStore();
    const [totalUnread, setTotalUnread] = useState(0);
    const [waitingCount, setWaitingCount] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const fetchChatBadge = useCallback(async () => {
        try {
            const res = await fetch("/api/chat/session");
            const data = await res.json();
            const slist = data.sessions ?? [];
            setTotalUnread(slist.reduce((a: number, s: { unread_by_admin: number }) => a + s.unread_by_admin, 0));
            setWaitingCount(slist.filter((s: { status: string }) => s.status === "waiting").length);
        } catch { /* silent */ }
    }, []);

    useEffect(() => {
        fetchChatBadge();
        const t = setInterval(fetchChatBadge, 30_000);
        return () => clearInterval(t);
    }, [fetchChatBadge]);

    useEffect(() => {
        if (!_hasHydrated) return; // tunggu sampai localStorage sudah dibaca
        if (!isAuthenticated) {
            router.push("/login");
        } else if (user?.role === "user") {
            router.push("/");
        }
    }, [isAuthenticated, user, router, _hasHydrated]);

    // Tampilkan loading spinner sambil menunggu hydration
    if (!_hasHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#2BBEE8', borderTopColor: 'transparent' }} />
                    <p className="text-sm text-slate-400">Memuat...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || user?.role === "user") return null;


    const isActive = (href: string, exact: boolean) =>
        exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

    const currentNav = navItems.find((n) => isActive(n.href, n.exact));

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="p-5 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                    <svg width="28" height="28" viewBox="0 0 38 38" fill="none">
                        <rect x="5" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                        <rect x="22" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                        <rect x="5" y="11" width="11" height="7" fill="#2BBEE8" />
                        <rect x="22" y="11" width="11" height="7" fill="#2BBEE8" />
                        <rect x="5" y="20" width="28" height="8" rx="4" fill="#2BBEE8" />
                        <rect x="10" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                        <rect x="20" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                    </svg>
                    <div>
                        <p className="font-bold text-white text-sm leading-none">Senja Wisata</p>
                        <p className="text-white/40 text-[10px] mt-0.5">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* User info */}
            <div className="p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-base shrink-0">
                        {user?.name[0]}
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-white text-sm leading-none truncate">{user?.name}</p>
                        <p className="text-white/50 text-xs mt-1 truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-[10px] bg-blue/20 text-blue px-2 py-0.5 rounded-full">
                            {user?.role === "owner" ? "👑 Owner" : "🛠 Admin"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 flex flex-col gap-0.5">
                <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2 mt-1">Menu Utama</p>
                {navItems.map((item) => {
                    const active = isActive(item.href, item.exact);
                    const isChat = item.href === "/admin/chats";
                    const chatBadge = isChat && (totalUnread > 0 || waitingCount > 0) ? (totalUnread || waitingCount) : 0;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                                active
                                    ? "bg-white/15 text-white font-semibold"
                                    : "text-white/60 hover:bg-white/8 hover:text-white font-medium"
                            )}
                        >
                            <item.icon size={17} className="shrink-0" />
                            <span className="flex-1">{item.label}</span>
                            {chatBadge > 0 && (
                                <span className="text-[9px] font-bold bg-accent text-white px-1.5 py-0.5 rounded-full">
                                    {chatBadge}
                                </span>
                            )}
                            {active && !chatBadge && <ChevronRight size={13} className="opacity-40" />}
                        </Link>
                    );
                })}

                {user?.role === "owner" && (
                    <>
                        <div className="my-2 border-t border-white/10" />
                        <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">Owner</p>
                        <Link
                            href="/owner"
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-amber-300 hover:bg-white/8 transition-all font-medium border border-amber-300/20"
                        >
                            <Crown size={17} className="shrink-0" />
                            <span>Owner Dashboard</span>
                        </Link>
                    </>
                )}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-white/10">
                <button
                    onClick={() => { logout(); router.push("/"); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:bg-white/8 hover:text-red-300 transition-all w-full text-sm font-medium"
                >
                    <LogOut size={17} />
                    <span>Keluar</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-60 text-white shrink-0 sticky top-0 h-screen overflow-y-auto" style={{ background: '#05073C' }}>
                <SidebarContent />
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-screen w-60 text-white flex flex-col z-40 transition-transform duration-300 lg:hidden",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
                style={{ background: '#05073C' }}
            >
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                    <X size={20} />
                </button>
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {/* Top bar */}
                <header className="bg-white border-b border-slate-100 px-4 lg:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-slate-400 hover:text-primary transition-colors"
                        >
                            <Menu size={22} />
                        </button>
                        <div>
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-0.5">
                                <span>Admin</span>
                                {currentNav && currentNav.href !== "/admin" && (
                                    <>
                                        <ChevronRight size={11} />
                                        <span>{currentNav.label}</span>
                                    </>
                                )}
                            </div>
                            <h1 className="font-bold text-primary text-base leading-none">
                                {currentNav?.label || "Dashboard"}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="relative w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">
                            <Bell size={16} className="text-slate-400" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <Link href="/" className="hidden sm:flex btn btn-outline btn-sm gap-1.5 text-xs py-1.5">
                            ← Ke Website
                        </Link>
                        <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {user?.name[0]}
                        </div>
                    </div>
                </header>

                <div className="p-4 lg:p-6">{children}</div>
            </main>
        </div>
    );
}
