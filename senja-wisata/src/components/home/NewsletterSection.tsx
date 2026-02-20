"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) { setSubmitted(true); setEmail(""); }
    };

    return (
        <section className="section-sm bg-primary relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            </div>
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <div className="w-14 h-14 bg-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Mail size={24} className="text-blue" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Dapatkan Penawaran Eksklusif</h2>
                    <p className="text-white/60 mb-8">Daftar newsletter kami dan dapatkan promo, tips wisata, dan penawaran eksklusif langsung di inbox Anda.</p>

                    {submitted ? (
                        <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold">
                            <CheckCircle size={20} /> Terima kasih! Anda sudah terdaftar.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Masukkan email Anda..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 text-sm"
                            />
                            <button type="submit" className="btn btn-primary gap-2 shrink-0">
                                <Send size={16} /> Daftar
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
