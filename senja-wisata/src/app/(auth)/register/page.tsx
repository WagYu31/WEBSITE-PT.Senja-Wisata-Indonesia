"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [showPw, setShowPw] = useState(false);
    const [pw, setPw] = useState("");
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : /[A-Z]/.test(pw) && /[0-9]/.test(pw) ? 4 : 3;
    const strengthLabel = ["", "Lemah", "Sedang", "Kuat", "Sangat Kuat"][strength];
    const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue", "bg-emerald-500"][strength];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        router.push("/login");
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Decorative */}
            <div className="hidden lg:flex gradient-primary items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-20 w-64 h-64 bg-blue/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white max-w-sm">
                    <div className="text-6xl mb-6">🌊</div>
                    <h1 className="text-4xl font-bold mb-4">Mulai Petualangan Anda!</h1>
                    <p className="text-white/70 text-lg">Daftar gratis dan temukan ratusan paket wisata terbaik Indonesia.</p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {[["500+", "Paket Wisata"], ["120+", "Destinasi"], ["15K+", "Traveler"], ["4.9★", "Rating"]].map(([v, l]) => (
                            <div key={l} className="bg-white/10 rounded-xl p-3">
                                <div className="text-2xl font-bold text-white">{v}</div>
                                <div className="text-white/60 text-xs">{l}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Form */}
            <div className="flex items-center justify-center p-8 overflow-y-auto">
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md py-8">
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

                    <h2 className="text-3xl font-bold text-primary mb-2">Buat Akun Baru</h2>
                    <p className="text-slate-500 mb-8">Sudah punya akun? <Link href="/login" className="text-accent font-semibold hover:underline">Masuk di sini</Link></p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="form-label">Nama Depan</label>
                                <div className="relative">
                                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" required placeholder="Budi" className="form-input pl-9 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Nama Belakang</label>
                                <input type="text" required placeholder="Santoso" className="form-input text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Email</label>
                            <div className="relative">
                                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="email" required placeholder="email@example.com" className="form-input pl-9 text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">No. HP / WhatsApp</label>
                            <div className="relative">
                                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="tel" placeholder="+62 812-xxxx-xxxx" className="form-input pl-9 text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} required placeholder="Min. 8 karakter" className="form-input pl-9 pr-9 text-sm" minLength={8} />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {pw && (
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full transition-all ${strengthColor}`} style={{ width: `${strength * 25}%` }} />
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">{strengthLabel}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="form-label">Konfirmasi Password</label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="password" required placeholder="Ulangi password" className="form-input pl-9 text-sm" />
                            </div>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded accent-accent" />
                            <span className="text-sm text-slate-600">
                                Saya setuju dengan <a href="#" className="text-accent hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-accent hover:underline">Kebijakan Privasi</a>
                            </span>
                        </label>

                        <button type="submit" disabled={loading || !agreed} className="btn btn-primary w-full text-base py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
