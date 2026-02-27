"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle, XCircle } from "lucide-react";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    if (!token) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle size={40} className="text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-3">Link Tidak Valid</h2>
                <p className="text-slate-500 mb-6">Token reset password tidak ditemukan. Pastikan Anda menggunakan link lengkap dari email.</p>
                <Link href="/forgot-password" className="btn btn-primary px-8 py-3">
                    Minta Link Baru
                </Link>
            </motion.div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Password tidak cocok");
            return;
        }

        if (password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.error || "Terjadi kesalahan");
            }
        } catch {
            setError("Gagal menghubungi server");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-3">Password Berhasil Direset! 🎉</h2>
                <p className="text-slate-500 mb-6">
                    Password Anda telah diperbarui. Silakan login dengan password baru.
                </p>
                <Link href="/login" className="btn btn-primary px-8 py-3 inline-block">
                    Login Sekarang
                </Link>
            </motion.div>
        );
    }

    return (
        <>
            <h2 className="text-3xl font-bold text-primary mb-2">Buat Password Baru</h2>
            <p className="text-slate-500 mb-8">
                Masukkan password baru untuk akun Anda. Gunakan kombinasi huruf, angka, dan simbol.
            </p>

            {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 mb-4 text-sm">
                    <AlertCircle size={16} /> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="form-label">Password Baru</label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type={showPw ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimal 6 karakter"
                            required
                            className="form-input pl-10 pr-10"
                        />
                        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="form-label">Konfirmasi Password</label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type={showConfirmPw ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Ulangi password baru"
                            required
                            className="form-input pl-10 pr-10"
                        />
                        <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Password strength indicator */}
                <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${password.length >= level * 3
                                    ? password.length >= 12
                                        ? "bg-green-500"
                                        : password.length >= 8
                                            ? "bg-yellow-500"
                                            : "bg-red-400"
                                    : "bg-slate-200"
                                }`}
                        />
                    ))}
                </div>
                <p className="text-xs text-slate-400 -mt-2">
                    {password.length === 0
                        ? ""
                        : password.length < 6
                            ? "🔴 Terlalu pendek"
                            : password.length < 8
                                ? "🟡 Cukup"
                                : password.length < 12
                                    ? "🟢 Bagus"
                                    : "💪 Sangat kuat"}
                </p>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Memproses..." : "Reset Password"}
                </button>
            </form>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Decorative */}
            <div className="hidden lg:flex gradient-primary items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-blue/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white">
                    <div className="text-6xl mb-6">🔑</div>
                    <h1 className="text-4xl font-bold mb-4">Password Baru</h1>
                    <p className="text-white/70 text-lg max-w-sm mx-auto">
                        Buat password baru yang kuat untuk melindungi akun Anda.
                    </p>
                </motion.div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8">
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
                    <Link href="/login" className="flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors">
                        <ArrowLeft size={18} />
                        <span className="text-sm">Kembali ke Login</span>
                    </Link>

                    <Suspense fallback={<div className="text-center text-slate-400">Memuat...</div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </motion.div>
            </div>
        </div>
    );
}
