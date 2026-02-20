"use client";

import { useState, useMemo } from "react";
import { Search, Grid, List, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TourCard from "@/components/tours/TourCard";
import { tours, categories } from "@/lib/data";

export default function ToursPage() {
    const [query, setQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("popular");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000000]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filtered = useMemo(() => {
        let result = [...tours];
        if (query) result = result.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()) || t.location.toLowerCase().includes(query.toLowerCase()));
        if (selectedCategories.length > 0) result = result.filter((t) => selectedCategories.includes(t.category.toLowerCase()));
        result = result.filter((t) => t.price >= priceRange[0] && t.price <= priceRange[1]);
        if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
        else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
        else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
        return result;
    }, [query, selectedCategories, sortBy, priceRange]);

    const toggleCategory = (id: string) =>
        setSelectedCategories((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Page Header */}
            <div className="gradient-primary pt-32 pb-12">
                <div className="container">
                    <span className="italic font-serif text-blue text-lg">Jelajahi Indonesia</span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mt-2 mb-2">Semua Paket Wisata</h1>
                    <p className="text-white/60">Beranda · Paket Wisata</p>
                </div>
            </div>

            <div className="container py-10">
                {/* Search & Sort Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama tour atau destinasi..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="form-input pl-11 shadow-sm"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="form-input w-auto min-w-[160px] shadow-sm"
                    >
                        <option value="popular">Terpopuler</option>
                        <option value="rating">Rating Terbaik</option>
                        <option value="price-asc">Harga Terendah</option>
                        <option value="price-desc">Harga Tertinggi</option>
                    </select>
                    <div className="flex gap-2">
                        <button onClick={() => setView("grid")} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${view === "grid" ? "bg-primary text-white" : "bg-white text-slate-400 hover:bg-slate-100"}`}>
                            <Grid size={18} />
                        </button>
                        <button onClick={() => setView("list")} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${view === "list" ? "bg-primary text-white" : "bg-white text-slate-400 hover:bg-slate-100"}`}>
                            <List size={18} />
                        </button>
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white text-slate-500 hover:bg-slate-100">
                            <SlidersHorizontal size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filter */}
                    <aside className={`lg:block shrink-0 w-64 ${sidebarOpen ? "block" : "hidden"}`}>
                        <div className="card p-5 sticky top-24">
                            <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                                <SlidersHorizontal size={16} className="text-blue" /> Filter Pencarian
                            </h3>

                            {/* Category */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-3">KATEGORI</h4>
                                <div className="flex flex-col gap-2">
                                    {categories.map((cat) => (
                                        <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat.id)}
                                                onChange={() => toggleCategory(cat.id)}
                                                className="w-4 h-4 rounded accent-accent"
                                            />
                                            <span className="text-sm text-slate-600 group-hover:text-primary">{cat.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-3">HARGA MAKSIMAL</h4>
                                <input
                                    type="range"
                                    min={0}
                                    max={15000000}
                                    step={500000}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                                    className="w-full accent-accent"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>Rp 0</span>
                                    <span className="font-semibold text-accent">Rp {(priceRange[1] / 1000000).toFixed(1)}jt</span>
                                </div>
                            </div>

                            {/* Reset */}
                            <button
                                onClick={() => { setSelectedCategories([]); setPriceRange([0, 15000000]); setQuery(""); }}
                                className="btn bg-slate-100 text-slate-600 hover:bg-slate-200 w-full text-sm"
                            >
                                Reset Filter
                            </button>
                        </div>
                    </aside>

                    {/* Tour Grid */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-sm text-slate-500">
                                Menampilkan <span className="font-bold text-accent">{filtered.length}</span> paket wisata
                            </p>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {filtered.length === 0 ? (
                                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-slate-400">
                                    <Search size={40} className="mx-auto mb-3 opacity-30" />
                                    <p>Tidak ada tour yang sesuai filter</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="grid"
                                    className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-4"}
                                >
                                    {filtered.map((tour, i) => (
                                        <TourCard key={tour.id} tour={tour} index={i} />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
