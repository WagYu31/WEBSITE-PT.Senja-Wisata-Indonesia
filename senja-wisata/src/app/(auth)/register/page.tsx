"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, AlertCircle } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const pw = form.password;
    const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : /[A-Z]/.test(pw) && /[0-9]/.test(pw) ? 4 : 3;
    const strengthLabel = ["", "Lemah", "Sedang", "Kuat", "Sangat Kuat"][strength];
    const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue", "bg-emerald-500"][strength];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Password dan konfirmasi password tidak sama");
            return;
        }

        if (form.password.length < 8) {
            setError("Password minimal 8 karakter");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Registrasi gagal");
                setLoading(false);
                return;
            }

            setSuccess(true);
            setTimeout(() => router.push("/login"), 2000);
        } catch {
            setError("Koneksi gagal. Coba lagi.");
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8 max-w-md">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">Registrasi Berhasil! 🎉</h2>
                    <p className="text-slate-500 mb-4">Akun Anda telah dibuat. Mengalihkan ke halaman login...</p>
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                </motion.div>
            </div>
        );
    }

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
                    <p className="text-slate-500 mb-6">Sudah punya akun? <Link href="/login" className="text-accent font-semibold hover:underline">Masuk di sini</Link></p>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="form-label">Nama Depan</label>
                                <div className="relative">
                                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" required placeholder="Budi" className="form-input pl-9 text-sm" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Nama Belakang</label>
                                <input type="text" placeholder="Santoso" className="form-input text-sm" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Email</label>
                            <div className="relative">
                                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="email" required placeholder="email@example.com" className="form-input pl-9 text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">No. HP / WhatsApp</label>
                            <div className="relative">
                                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="tel" placeholder="+62 812-xxxx-xxxx" className="form-input pl-9 text-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type={showPw ? "text" : "password"} value={pw} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Min. 8 karakter" className="form-input pl-9 pr-9 text-sm" minLength={8} />
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
                                <input type="password" required placeholder="Ulangi password" className="form-input pl-9 text-sm" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
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

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-2">
                            <p className="text-xs font-semibold text-slate-500 mb-2">📋 Akun Demo (untuk testing):</p>
                            <div className="space-y-1 text-xs text-slate-500">
                                <p><span className="font-medium">Owner:</span> owner@senja.com</p>
                                <p><span className="font-medium">Admin:</span> admin@senja.com</p>
                                <p><span className="font-medium">User:</span> user@senja.com</p>
                                <p><span className="font-medium">Password:</span> password123</p>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
