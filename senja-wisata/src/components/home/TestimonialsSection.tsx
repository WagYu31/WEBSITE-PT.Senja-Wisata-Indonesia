"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section ref={ref} className="section bg-slate-50">
            <div className="container">
                <div className="text-center mb-12">
                    <span className="section-label">Kata Mereka</span>
                    <h2 className="section-title">Testimoni Traveler</h2>
                    <p className="section-desc mx-auto">Ribuan traveler telah membuktikan kualitas layanan kami</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="card p-6 relative"
                        >
                            <Quote size={32} className="text-blue/20 absolute top-5 right-5" />
                            <div className="flex gap-0.5 mb-3">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star key={s} size={14} className={s <= t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                                ))}
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                            <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                                <Image
                                    src={t.avatar}
                                    alt={t.name}
                                    width={44}
                                    height={44}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-bold text-sm text-primary">{t.name}</div>
                                    <div className="text-xs text-slate-400">{t.from}</div>
                                </div>
                                <span className="ml-auto badge badge-outline text-[10px]">{t.tour}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
