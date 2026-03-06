"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, ArrowRight, Sparkles, Clock } from "lucide-react";

export default function PromoBanner() {
    return (
        <section className="section bg-white">
            <div className="container">
                <div className="text-center mb-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-2 text-sm font-semibold mb-3"
                    >
                        <Tag size={14} /> Promo Spesial
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl lg:text-4xl font-bold text-primary"
                    >
                        Penawaran <span className="text-accent">Terbatas</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Main promo */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                        className="relative overflow-hidden rounded-3xl min-h-[300px] flex items-end p-8 group cursor-pointer"
                    >
                        <Image src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=70" alt="Promo Bali" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,7,60,0.85) 0%, rgba(43,190,232,0.3) 100%)" }} />

                        {/* Animated glow */}
                        <motion.div
                            className="absolute top-0 right-0 w-32 h-32 rounded-full"
                            style={{ background: "radial-gradient(circle, rgba(252,76,77,0.4) 0%, transparent 70%)" }}
                            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        <div className="relative z-10">
                            <motion.div
                                className="inline-flex items-center gap-1.5 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles size={12} /> DISKON 30%
                            </motion.div>
                            <h3 className="text-white font-bold text-3xl mb-2">Bali Complete Tour</h3>
                            <div className="flex items-center gap-3 text-white/70 text-sm mb-4">
                                <span className="flex items-center gap-1"><Clock size={13} /> Berlaku hingga akhir tahun</span>
                                <span>· Min. 4 peserta</span>
                            </div>
                            <Link href="/tours" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-all group/btn">
                                Klaim Sekarang <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Side promos */}
                    <div className="flex flex-col gap-6">
                        {[
                            { title: "Early Bird Raja Ampat", desc: "Booking 30 hari lebih awal, hemat 20%", img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&q=60", badge: "EARLY BIRD", color: "from-[#05073C]/90 to-[#2BBEE8]/40" },
                            { title: "Honeymoon Package", desc: "Paket privat Lombok + Gili eksklusif", img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=60", badge: "SPESIAL", color: "from-[#05073C]/90 to-[#7C3AED]/40" },
                        ].map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -3, scale: 1.01 }}
                                className="relative overflow-hidden rounded-2xl flex items-end p-6 min-h-[130px] group flex-1 cursor-pointer"
                            >
                                <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className={`absolute inset-0 bg-gradient-to-r ${p.color}`} />
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-1 bg-[#2BBEE8]/20 border border-[#2BBEE8]/40 backdrop-blur-sm text-[#2BBEE8] text-[10px] font-bold px-2.5 py-1 rounded-full mb-2">
                                        <Sparkles size={10} /> {p.badge}
                                    </div>
                                    <h4 className="text-white font-bold text-base group-hover:text-[#2BBEE8] transition-colors">{p.title}</h4>
                                    <p className="text-white/60 text-xs">{p.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
