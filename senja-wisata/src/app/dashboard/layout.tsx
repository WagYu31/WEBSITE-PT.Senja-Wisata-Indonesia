"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { Home, Package, Heart, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/trips", label: "My Trips", icon: Package },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
    { href: "/dashboard/profile", label: "Profil", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated) router.push("/login");
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 text-white shrink-0 sticky top-0 h-screen overflow-y-auto" style={{ backgroundColor: '#05073C' }}>
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
                </div>

                {/* User info */}
                <div className="p-6 border-b border-white/10">
                    <div className="w-12 h-12 bg-blue/30 rounded-full flex items-center justify-center text-blue font-bold text-xl mb-3">
                        {user?.name[0]}
                    </div>
                    <p className="font-semibold text-white">{user?.name}</p>
                    <p className="text-white/50 text-sm">{user?.email}</p>
                    <span className="badge bg-blue/20 text-blue text-[10px] mt-2">Traveler</span>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-1">
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

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => { logout(); router.push("/"); }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-accent transition-all w-full text-sm font-semibold"
                    >
                        <LogOut size={18} /> Keluar
                    </button>
                </div>
            </aside>

            <main className="flex-1 min-w-0">
                {/* Top bar */}
                <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <h1 className="font-bold text-primary">
                        {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
                    </h1>
                    <Link href="/tours" className="btn btn-primary btn-sm gap-2">
                        <Package size={15} /> Cari Tour
                    </Link>
                </header>

                <div className="p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
