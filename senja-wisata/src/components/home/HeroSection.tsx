"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, ChevronRight, Sparkles } from "lucide-react";
import { useSiteSettings } from "@/lib/settings";

const bgImages = [
    "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1920&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
    "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=1920&q=80",
    "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920&q=80",
];

const tabs = ["Semua", "Pantai", "Budaya", "Petualangan", "Keluarga"];

export default function HeroSection() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Semua");
    const [destination, setDestination] = useState("");
    const [bgIdx, setBgIdx] = useState(0);
    const settings = useSiteSettings();

    useEffect(() => {
        const timer = setInterval(() => setBgIdx(i => (i + 1) % bgImages.length), 6000);
        return () => clearInterval(timer);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (destination) params.set("q", destination);
        if (activeTab !== "Semua") params.set("category", activeTab);
        router.push(`/tours?${params.toString()}`);
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Auto-rotating backgrounds */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={bgIdx}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={bgImages[bgIdx]}
                        alt="Hero background"
                        fill
                        priority
                        className="object-cover"
                        quality={90}
                    />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-[#05073C]/90 via-[#05073C]/70 to-[#05073C]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05073C]/60 via-transparent to-transparent" />

            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(43,190,232,0.15) 0%, transparent 70%)", top: "-10%", right: "10%" }}
                    animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(252,76,77,0.1) 0%, transparent 70%)", bottom: "5%", left: "5%" }}
                    animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: 2 + (i % 3) * 2,
                            height: 2 + (i % 3) * 2,
                            background: i % 2 === 0 ? "#2BBEE8" : "#FC4C4D",
                            left: `${8 + i * 8}%`,
                            top: `${15 + (i % 4) * 18}%`,
                        }}
                        animate={{
                            y: [-15, 15, -15],
                            opacity: [0.2, 0.7, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
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
                            <motion.span
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/80"
                                animate={{ boxShadow: ["0 0 0px rgba(43,190,232,0)", "0 0 20px rgba(43,190,232,0.3)", "0 0 0px rgba(43,190,232,0)"] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <Sparkles size={14} className="text-[#2BBEE8]" />
                                {settings.hero.tagline}
                            </motion.span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
                        >
                            {settings.hero.title1}{" "}
                            <motion.span
                                className="italic font-serif bg-gradient-to-r from-[#2BBEE8] to-[#7C3AED] bg-clip-text text-transparent"
                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                style={{ backgroundSize: "200% 200%" }}
                            >
                                {settings.hero.title2}
                            </motion.span>
                            <br />
                            Liburan{" "}
                            <span className="text-accent relative">
                                {settings.hero.titleAccent}
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-1 bg-accent/50 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 1 }}
                                />
                            </span>
                            <br />
                            Anda
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg"
                        >
                            {settings.hero.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex gap-3 flex-wrap mb-10"
                        >
                            <a href="/tours" className="group relative overflow-hidden btn btn-primary btn-lg">
                                <span className="relative z-10 flex items-center gap-1">{settings.hero.ctaPrimary} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                            </a>
                            <a href="/about" className="btn btn-outline-white btn-lg backdrop-blur-sm">
                                {settings.hero.ctaSecondary}
                            </a>
                        </motion.div>

                        {/* Mini stats with glow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-8 flex-wrap"
                        >
                            {[[settings.stats.stat2Value, settings.stats.stat2Label], [settings.stats.stat3Value, settings.stats.stat3Label], [settings.stats.stat4Value + "★", settings.stats.stat4Label]].map(([val, lbl]) => (
                                <div key={lbl} className="group">
                                    <div className="text-2xl font-bold text-white group-hover:text-[#2BBEE8] transition-colors">{val}</div>
                                    <div className="text-sm text-white/40">{lbl}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Floating card stack */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            {/* Background card (offset) */}
                            <motion.div
                                className="absolute -top-3 -right-3 w-full h-full rounded-2xl"
                                style={{ background: "linear-gradient(135deg, #2BBEE8, #7C3AED)" }}
                                animate={{ rotate: [2, 4, 2] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            {/* Main card */}
                            <motion.div
                                className="rounded-2xl overflow-hidden aspect-[4/5] relative shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=600&q=80"
                                    alt="Featured destination"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05073C]/90 via-[#05073C]/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="text-white/60 text-xs mb-1 flex items-center gap-1"><Sparkles size={10} /> Destinasi Terpopuler</div>
                                    <div className="text-white font-bold text-xl mb-1">Raja Ampat 🐠</div>
                                    <div className="text-accent font-bold text-lg">Rp 8.500.000</div>
                                </div>
                            </motion.div>

                            {/* Floating rating badge */}
                            <motion.div
                                className="absolute -left-6 top-1/4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-xl"
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="text-xs text-slate-500">Rating</div>
                                <div className="flex items-center gap-1 text-amber-500 font-bold">⭐ 4.9/5</div>
                            </motion.div>

                            {/* Floating traveler count */}
                            <motion.div
                                className="absolute -right-4 bottom-1/4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-xl"
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="text-xs text-slate-500">Happy Travelers</div>
                                <div className="text-primary font-bold">15,000+</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Search Widget — glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-16 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-black/10 border border-white/50"
                >
                    <div className="flex gap-2 mb-5 flex-wrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab
                                    ? "bg-gradient-to-r from-[#05073C] to-[#2BBEE8] text-white shadow-lg shadow-blue/20"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:scale-105"
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
                                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2BBEE8]" />
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
                                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2BBEE8]" />
                                <input type="date" className="form-input pl-9" min={new Date().toISOString().split("T")[0]} />
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            className="h-12 rounded-xl gap-2 text-white font-semibold flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #05073C, #2BBEE8)" }}
                            whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(43,190,232,0.3)" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Search size={18} /> Cari Sekarang
                        </motion.button>
                    </form>
                </motion.div>

                {/* Bg image indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {bgImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setBgIdx(i)}
                            className={`rounded-full transition-all duration-300 ${bgIdx === i ? "w-8 h-2 bg-[#2BBEE8]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
