"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Package, Globe, ChevronRight } from "lucide-react";
import { destinations } from "@/lib/data";

const islands = ["Semua", "Bali", "Jawa", "Papua", "NTT", "NTB", "Sumatra", "Kalimantan", "Sulawesi"];

const whyItems = [
    { icon: "🏝️", title: "17.000+ Pulau", desc: "Indonesia memiliki lebih dari 17.000 pulau yang menakjubkan, dari Sabang sampai Merauke." },
    { icon: "🌊", title: "Biodiversitas Laut", desc: "Segitiga Terumbu Karang dunia berada di Indonesia, dengan ribuan spesies laut yang unik." },
    { icon: "🏛️", title: "Warisan Dunia", desc: "8 situs UNESCO World Heritage, dari Borobudur hingga hutan hujan tropis Sumatera." },
    { icon: "🍜", title: "Kuliner Nusantara", desc: "Kekayaan masakan dari ratusan suku dengan cita rasa yang tak tertandingi di dunia." },
];

export default function DestinationsPage() {
    const [search, setSearch] = useState("");
    const [island, setIsland] = useState("Semua");

    const filtered = useMemo(() => {
        return destinations.filter((d) => {
            const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
                d.description.toLowerCase().includes(search.toLowerCase());
            const matchIsland = island === "Semua" || d.island === island;
            return matchSearch && matchIsland;
        });
    }, [search, island]);

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="gradient-primary py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto max-w-4xl relative text-center text-white">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
                            <Globe size={14} /> Explore Nusantara
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            Destinasi <span className="text-accent">Wisata Indonesia</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                            Jelajahi keindahan 17.000 pulau Indonesia, dari sabang di ujung barat hingga merauke di ujung timur.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari destinasi..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-primary placeholder:text-slate-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue/30 text-sm"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filter */}
            <section className="bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {islands.map((isl) => (
                            <button
                                key={isl}
                                onClick={() => setIsland(isl)}
                                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${island === isl ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {isl}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-primary">
                                {island === "Semua" ? "Semua Destinasi" : `Destinasi ${island}`}
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">{filtered.length} destinasi ditemukan</p>
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <Globe size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-semibold">Destinasi tidak ditemukan</p>
                            <p className="text-sm mt-1">Coba kata kunci lain</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((dest, i) => (
                                <motion.div
                                    key={dest.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={`/tours?island=${dest.island}`}
                                        className="group card overflow-hidden block hover:-translate-y-1 transition-all"
                                    >
                                        <div className="relative h-52 overflow-hidden">
                                            <img
                                                src={dest.image}
                                                alt={dest.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                            <div className="absolute bottom-4 left-4 text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
                                                <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                                                <div className="flex items-center gap-1 text-white/90 text-sm">
                                                    <MapPin size={12} /> {dest.country}
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30">
                                                    {dest.island}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-slate-500 text-sm mb-3">{dest.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-sm text-blue-700 font-semibold">
                                                    <Package size={14} /> {dest.tours} paket tersedia
                                                </div>
                                                <span className="text-accent text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                                                    Lihat Tour <ChevronRight size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Indonesia */}
            <section className="py-16 bg-slate-50 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-3">Mengapa Indonesia?</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">
                            Indonesia adalah salah satu destinasi wisata terkaya di dunia dengan keanekaragaman alam dan budaya yang luar biasa.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyItems.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="card p-6 text-center hover:-translate-y-1 transition-all"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="gradient-primary rounded-3xl p-12 text-white relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        </div>
                        <div className="relative">
                            <h2 className="text-3xl font-bold mb-3 text-white">Siap Menjelajahi Indonesia?</h2>
                            <p className="text-white/70 mb-8 max-w-lg mx-auto">
                                Temukan paket wisata terbaik yang sesuai dengan impian dan budget Anda.
                            </p>
                            <Link href="/tours" className="btn bg-white text-primary hover:bg-white/90 text-base px-8 py-3.5 font-bold">
                                Lihat Semua Paket Wisata
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
