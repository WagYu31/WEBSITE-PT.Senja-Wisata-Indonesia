"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Package } from "lucide-react";
import { destinations } from "@/lib/data";

export default function DestinationsSection() {
    return (
        <section className="section bg-white">
            <div className="container">
                <div className="text-center mb-12">
                    <span className="section-label">Jelajahi Nusantara</span>
                    <h2 className="section-title">Destinasi Favorit</h2>
                    <p className="section-desc mx-auto">Dari 17.000 pulau Indonesia — kami memandu Anda menemukan yang terbaik</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                    {destinations.slice(0, 6).map((dest, i) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className={i === 0 ? "col-span-2 sm:col-span-1 lg:col-span-2 row-span-2" : ""}
                        >
                            <Link
                                href="/destinations"
                                className="group relative block overflow-hidden rounded-2xl h-full min-h-[180px]"
                            >
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-4">
                                    <h3 className="text-white font-bold text-lg leading-tight">{dest.name}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-white/70 text-sm">
                                        <span className="flex items-center gap-1"><MapPin size={11} /> {dest.country}</span>
                                        <span className="flex items-center gap-1"><Package size={11} /> {dest.tours} paket</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link href="/destinations" className="btn btn-outline gap-2">
                        Lihat Semua Destinasi
                    </Link>
                </div>
            </div>
        </section>
    );
}
