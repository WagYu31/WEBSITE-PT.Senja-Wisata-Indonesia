"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, User, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useWishlistStore } from "@/store/wishlist";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tours", label: "Tours" },
    { href: "/destinations", label: "Destinasi" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/contact", label: "Kontak" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuthStore();
    const wishlistItems = useWishlistStore((s) => s.items);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const isHome = pathname === "/";
    const transparent = isHome && !scrolled && !mobileOpen;

    const dashboardLink =
        user?.role === "owner" ? "/owner" : user?.role === "admin" ? "/admin" : "/dashboard";

    return (
        <header
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300",
                transparent
                    ? "bg-transparent"
                    : "bg-white/95 backdrop-blur-md shadow-navbar border-b border-white/20"
            )}
        >
            <div className="container">
                <nav className="flex items-center justify-between h-20" aria-label="Navigasi utama">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0">
                        <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
                            <rect x="5" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                            <rect x="22" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                            <rect x="5" y="11" width="11" height="7" fill="#2BBEE8" />
                            <rect x="22" y="11" width="11" height="7" fill="#2BBEE8" />
                            <rect x="5" y="20" width="28" height="8" rx="4" fill="#2BBEE8" />
                            <rect x="10" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                            <rect x="20" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                        </svg>
                        <div>
                            <div
                                className={cn(
                                    "font-bold text-lg leading-tight transition-colors",
                                    transparent ? "text-white" : "text-primary"
                                )}
                            >
                                Senja Wisata
                            </div>
                            <div
                                className={cn(
                                    "text-[10px] leading-none transition-colors",
                                    transparent ? "text-white/60" : "text-slate-400"
                                )}
                            >
                                PT. Senja Wisata Indonesia
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                                            transparent
                                                ? active
                                                    ? "text-white bg-white/10"
                                                    : "text-white/80 hover:text-white hover:bg-white/10"
                                                : active
                                                    ? "text-accent bg-accent/10"
                                                    : "text-slate-600 hover:text-primary hover:bg-slate-100"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Wishlist */}
                        <Link
                            href="/tours"
                            className={cn(
                                "relative hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-all",
                                transparent ? "text-white hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
                            )}
                            aria-label="Wishlist"
                        >
                            <Heart size={20} />
                            {isAuthenticated && wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        {/* Auth Buttons / User Menu */}
                        {isAuthenticated && user ? (
                            <div className="relative hidden sm:block">
                                <button
                                    onClick={() => setUserMenuOpen((v) => !v)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-full transition-all",
                                        transparent ? "text-white hover:bg-white/10" : "hover:bg-slate-100"
                                    )}
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue to-primary flex items-center justify-center text-white font-bold text-sm">
                                        {user.name[0]}
                                    </div>
                                    <span className={cn("text-sm font-semibold hidden md:block", transparent ? "text-white" : "text-primary")}>
                                        {user.name.split(" ")[0]}
                                    </span>
                                    <ChevronDown size={14} className={transparent ? "text-white" : "text-slate-400"} />
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-card-hover border border-slate-100 py-2 z-50"
                                        >
                                            <div className="px-4 py-2 border-b border-slate-100">
                                                <p className="font-semibold text-sm">{user.name}</p>
                                                <p className="text-xs text-slate-400">{user.email}</p>
                                            </div>
                                            <Link href={dashboardLink} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors" onClick={() => setUserMenuOpen(false)}>
                                                <User size={15} /> Dashboard
                                            </Link>
                                            <button
                                                onClick={() => { logout(); setUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-accent hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut size={15} /> Keluar
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className={cn(
                                        "btn btn-sm font-semibold",
                                        transparent ? "text-white border-2 border-white hover:bg-white hover:text-primary" : "btn-outline"
                                    )}
                                >
                                    Masuk
                                </Link>
                                <Link href="/register" className="btn btn-primary btn-sm">
                                    Daftar
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            className={cn(
                                "lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all",
                                transparent ? "text-white hover:bg-white/10" : "text-primary hover:bg-slate-100"
                            )}
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        <div className="container py-4 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-3 rounded-xl font-semibold transition-all",
                                        pathname === link.href ? "bg-accent/10 text-accent" : "text-slate-600 hover:bg-slate-50"
                                    )}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                                {isAuthenticated ? (
                                    <Link href={dashboardLink} className="btn btn-primary flex-1 text-center" onClick={() => setMobileOpen(false)}>
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login" className="btn btn-outline flex-1 text-center" onClick={() => setMobileOpen(false)}>Masuk</Link>
                                        <Link href="/register" className="btn btn-primary flex-1 text-center" onClick={() => setMobileOpen(false)}>Daftar</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
