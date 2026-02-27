"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setSent(true);
            } else {
                setError(data.error || "Terjadi kesalahan");
            }
        } catch {
            setError("Gagal menghubungi server");
        } finally {
            setLoading(false);
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
                    <div className="text-6xl mb-6">🔐</div>
                    <h1 className="text-4xl font-bold mb-4">Lupa Password?</h1>
                    <p className="text-white/70 text-lg max-w-sm mx-auto">
                        Tenang, kami akan membantu Anda mengatur ulang password melalui email.
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

                    {!sent ? (
                        <>
                            <h2 className="text-3xl font-bold text-primary mb-2">Reset Password</h2>
                            <p className="text-slate-500 mb-8">
                                Masukkan email yang terdaftar. Kami akan mengirimkan link untuk mengatur ulang password Anda.
                            </p>

                            {error && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 mb-4 text-sm">
                                    <AlertCircle size={16} /> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="form-label">Email</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="email@example.com"
                                            required
                                            className="form-input pl-10"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Mengirim..." : "Kirim Link Reset"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} className="text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-primary mb-3">Email Terkirim! 📧</h2>
                            <p className="text-slate-500 mb-2">
                                Kami telah mengirim link reset password ke:
                            </p>
                            <p className="font-semibold text-primary text-lg mb-6">{email}</p>
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                                <p className="font-semibold mb-1">📝 Perhatian:</p>
                                <ul className="list-disc list-inside space-y-1 text-left">
                                    <li>Cek folder <strong>Inbox</strong> dan <strong>Spam/Junk</strong></li>
                                    <li>Link berlaku selama <strong>1 jam</strong></li>
                                    <li>Jika tidak menerima email, coba kirim ulang</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => { setSent(false); setEmail(""); }}
                                    className="btn btn-primary w-full py-3"
                                >
                                    Kirim Ulang
                                </button>
                                <Link href="/login" className="text-accent hover:underline text-sm">
                                    Kembali ke Login
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
