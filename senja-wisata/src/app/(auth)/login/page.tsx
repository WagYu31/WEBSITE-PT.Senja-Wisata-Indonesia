"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth";

const demoAccounts = [
    { role: "👑 Owner", email: "owner@senja.com", password: "owner123" },
    { role: "🛠 Admin", email: "admin@senja.com", password: "admin123" },
    { role: "👤 User", email: "user@senja.com", password: "user123" },
];

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setLoading(true);
        const result = await login(email, password);
        setLoading(false);
        if (result.success) {
            const user = useAuthStore.getState().user;
            if (user?.role === "owner") router.push("/owner");
            else if (user?.role === "admin") router.push("/admin");
            else router.push("/dashboard");
        } else {
            setError(result.error || "Login gagal");
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Decorative */}
            <div className="hidden lg:flex gradient-primary items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-blue/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white">
                    <div className="text-6xl mb-6">✈️</div>
                    <h1 className="text-4xl font-bold mb-4">Selamat Datang Kembali!</h1>
                    <p className="text-white/70 text-lg max-w-sm mx-auto">Masuk untuk melanjutkan perjalanan impian Anda bersama Senja Wisata.</p>
                    <div className="mt-8 flex flex-col gap-3">
                        {demoAccounts.map((acc) => (
                            <button
                                key={acc.role}
                                onClick={() => { setEmail(acc.email); setPassword(acc.password); }}
                                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm hover:bg-white/20 transition-all text-left"
                            >
                                <span className="font-semibold">{acc.role}</span>
                                <span className="text-white/60 text-xs block">{acc.email}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8">
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                        <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
                            <rect x="5" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                            <rect x="22" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                            <rect x="5" y="11" width="11" height="7" fill="#2BBEE8" />
                            <rect x="22" y="11" width="11" height="7" fill="#2BBEE8" />
                            <rect x="5" y="20" width="28" height="8" rx="4" fill="#2BBEE8" />
                            <rect x="10" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                            <rect x="20" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                        </svg>
                        <span className="font-bold text-primary">Senja Wisata</span>
                    </Link>

                    <h2 className="text-3xl font-bold text-primary mb-2">Masuk ke Akun</h2>
                    <p className="text-slate-500 mb-8">Belum punya akun? <Link href="/register" className="text-accent font-semibold hover:underline">Daftar gratis</Link></p>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-accent rounded-xl p-3 mb-4 text-sm">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="form-label">Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required className="form-input pl-10" />
                            </div>
                        </div>
                        <div>
                            <label className="form-label">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="form-input pl-10 pr-10" />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-sm text-accent hover:underline">Lupa password?</Link>
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary w-full text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    {/* Mobile demo accounts */}
                    <div className="lg:hidden mt-6 p-4 bg-slate-50 rounded-xl">
                        <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">Demo Accounts</p>
                        <div className="flex flex-col gap-2">
                            {demoAccounts.map((acc) => (
                                <button key={acc.role} onClick={() => { setEmail(acc.email); setPassword(acc.password); }} className="text-left text-sm text-slate-600 hover:text-accent py-1 border-b border-slate-100 last:border-0">
                                    {acc.role}: <span className="font-mono text-xs">{acc.email}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
