"use client";

import { useState } from "react";
import { tours } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Plus, Search, Edit2, Trash2, Eye, Star, MapPin, Clock } from "lucide-react";

const categoryOptions = ["Semua", "Beach", "Culture", "Adventure", "Family", "Honeymoon"];

export default function AdminToursPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Semua");

    const filtered = tours.filter((t) => {
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.location.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === "Semua" || t.category === category;
        return matchSearch && matchCat;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-primary">Kelola Tour</h2>
                    <p className="text-sm text-slate-400">{tours.length} paket wisata terdaftar</p>
                </div>
                <button className="btn btn-primary gap-2 self-start sm:self-auto">
                    <Plus size={16} /> Tambah Tour Baru
                </button>
            </div>

            {/* Filter bar */}
            <div className="card p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari nama tour atau lokasi..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-input pl-9 w-full"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {categoryOptions.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${category === c
                                ? "bg-primary text-white border-primary"
                                : "border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tours Table */}
            <div className="card overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="text-left p-4 font-semibold text-slate-500">Tour</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden md:table-cell">Lokasi</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden sm:table-cell">Harga</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden lg:table-cell">Rating</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden lg:table-cell">Kategori</th>
                            <th className="text-left p-4 font-semibold text-slate-500">Status</th>
                            <th className="text-left p-4 font-semibold text-slate-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((tour, i) => (
                            <tr key={tour.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === filtered.length - 1 ? "border-0" : ""}`}>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="w-14 h-10 object-cover rounded-lg shrink-0"
                                        />
                                        <div>
                                            <div className="font-semibold text-primary">{tour.title}</div>
                                            <div className="text-xs text-slate-400 flex items-center gap-1">
                                                <Clock size={10} /> {tour.duration}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 hidden md:table-cell text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={12} /> {tour.location}
                                    </span>
                                </td>
                                <td className="p-4 hidden sm:table-cell">
                                    <div className="font-semibold text-accent">{formatPrice(tour.price)}</div>
                                    {tour.originalPrice && (
                                        <div className="text-xs text-slate-400 line-through">{formatPrice(tour.originalPrice)}</div>
                                    )}
                                </td>
                                <td className="p-4 hidden lg:table-cell">
                                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                                        <Star size={12} fill="currentColor" /> {tour.rating}
                                        <span className="text-slate-400 font-normal text-xs">({tour.reviews})</span>
                                    </span>
                                </td>
                                <td className="p-4 hidden lg:table-cell">
                                    <span className="badge bg-blue/10 text-blue">{tour.category}</span>
                                </td>
                                <td className="p-4">
                                    <span className="badge badge-success">Aktif</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1">
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue/10 hover:text-blue transition-all" title="Preview">
                                            <Eye size={15} />
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-500 transition-all" title="Edit">
                                            <Edit2 size={15} />
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all" title="Hapus">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                        <Package size={40} className="mx-auto mb-3 opacity-30" />
                        <p className="font-semibold">Tidak ada tour ditemukan</p>
                    </div>
                )}
            </div>
        </div>
    );
}
