"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";

export default function PromoBanner() {
    return (
        <section className="section bg-white">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Main promo */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl min-h-[280px] flex items-end p-8 gradient-primary group"
                    >
                        <div className="absolute inset-0 opacity-20">
                            <Image src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=60" alt="Promo Bali" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="badge badge-accent mb-3"><Tag size={12} /> PROMO SPESIAL</div>
                            <h3 className="text-white font-bold text-3xl mb-2">Diskon 30% Bali Tour</h3>
                            <p className="text-white/70 text-sm mb-4">Berlaku hingga 28 Feb 2025 · Min. 4 peserta</p>
                            <Link href="/tours" className="btn btn-primary gap-2 btn-sm">
                                Klaim Sekarang <ArrowRight size={15} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Side promos */}
                    <div className="flex flex-col gap-6">
                        {[
                            { title: "Early Bird Raja Ampat", desc: "Booking 30 hari lebih awal, hemat 20%", img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&q=60", badge: "EARLY BIRD" },
                            { title: "Honeymoon Package", desc: "Paket privat Lombok + Gili eksklusif", img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=60", badge: "SPESIAL" },
                        ].map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="relative overflow-hidden rounded-2xl flex items-end p-5 min-h-[120px] group flex-1"
                            >
                                <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
                                <div className="relative z-10">
                                    <div className="badge badge-blue text-[10px] mb-1.5">{p.badge}</div>
                                    <h4 className="text-white font-bold text-base">{p.title}</h4>
                                    <p className="text-white/70 text-xs">{p.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
