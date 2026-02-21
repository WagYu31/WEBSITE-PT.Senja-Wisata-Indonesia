"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, ChevronRight, Star } from "lucide-react";

const bgImages = [
    "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1920&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
    "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=1920&q=80",
];

const tabs = ["Semua", "Pantai", "Budaya", "Petualangan", "Keluarga"];

export default function HeroSection() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Semua");
    const [destination, setDestination] = useState("");
    const [bgIdx] = useState(0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (destination) params.set("q", destination);
        if (activeTab !== "Semua") params.set("category", activeTab);
        router.push(`/tours?${params.toString()}`);
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src={bgImages[bgIdx]}
                    alt="Hero background"
                    fill
                    priority
                    className="object-cover"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/20" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue rounded-full opacity-40"
                        style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
                        animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
            </div>

            <div className="relative z-10 container pt-28 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <span className="italic font-serif text-blue text-xl">✈ Explore The World</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
                        >
                            Hemat &amp;{" "}
                            <span className="italic font-serif">Nikmati</span>
                            <br />
                            Liburan{" "}
                            <span className="text-accent">Terbaik</span>
                            <br />
                            Anda
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg"
                        >
                            Kami menghadirkan pengalaman wisata tak terlupakan ke seluruh destinasi impian Indonesia dengan harga terbaik dan pelayanan premium.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex gap-3 flex-wrap mb-10"
                        >
                            <a href="/tours" className="btn btn-primary btn-lg">
                                Jelajahi Paket <ChevronRight size={18} />
                            </a>
                            <a href="/about" className="btn btn-outline-white btn-lg">
                                Tentang Kami
                            </a>
                        </motion.div>

                        {/* Mini stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-6 flex-wrap"
                        >
                            {[["500+", "Paket Wisata"], ["15K+", "Happy Travelers"], ["4.9★", "Rating"]].map(([val, lbl]) => (
                                <div key={lbl}>
                                    <div className="text-2xl font-bold text-white">{val}</div>
                                    <div className="text-sm text-white/50">{lbl}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Floating card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=600&q=80"
                                    alt="Featured destination"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="text-white/70 text-xs mb-1">Destinasi Terpopuler</div>
                                    <div className="text-white font-bold text-xl mb-1">Raja Ampat 🐠</div>
                                    <div className="text-accent font-bold text-lg">Rp 8.500.000</div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>

                {/* Search Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-16 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl"
                >
                    {/* Tabs */}
                    <div className="flex gap-2 mb-5 flex-wrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === tab
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSearch} className="grid sm:grid-cols-4 gap-3 items-end">
                        <div className="sm:col-span-2">
                            <label className="form-label">Destinasi / Tour</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue" />
                                <input
                                    type="text"
                                    placeholder="Cari destinasi atau nama tour..."
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="form-input pl-9"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="form-label">Tanggal Berangkat</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue" />
                                <input type="date" className="form-input pl-9" min={new Date().toISOString().split("T")[0]} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary h-12 rounded-xl gap-2">
                            <Search size={18} /> Cari Sekarang
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
