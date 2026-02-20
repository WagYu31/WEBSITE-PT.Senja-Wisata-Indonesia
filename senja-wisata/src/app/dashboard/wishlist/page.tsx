"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Clock, Star, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const initialWishlist = [
    { id: 1, slug: "raja-ampat-paradise", title: "Raja Ampat Paradise", location: "Papua Barat", duration: "7 Days", rating: 4.9, price: 8500000, image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=70", category: "Beach" },
    { id: 2, slug: "komodo-island-adventure", title: "Komodo Island Adventure", location: "NTT", duration: "4 Days", rating: 4.8, price: 7200000, image: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=600&q=70", category: "Adventure" },
    { id: 3, slug: "lombok-gili-islands", title: "Lombok & Gili Islands", location: "NTB", duration: "5 Days", rating: 4.7, price: 4800000, image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=70", category: "Beach" },
    { id: 4, slug: "yogyakarta-cultural", title: "Yogyakarta Cultural Tour", location: "DIY Yogyakarta", duration: "3 Days", rating: 4.6, price: 2400000, image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=600&q=70", category: "Culture" },
    { id: 5, slug: "bali-complete-experience", title: "Bali Complete Experience", location: "Bali", duration: "5 Days", rating: 4.8, price: 5200000, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=70", category: "Culture" },
];

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(initialWishlist);

    const remove = (id: number) => setWishlist((w) => w.filter((t) => t.id !== id));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-primary">Wishlist Saya</h2>
                    <p className="text-slate-500 text-sm">{wishlist.length} tour tersimpan</p>
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-20">
                    <Heart size={48} className="mx-auto mb-4 text-slate-200" />
                    <p className="font-semibold text-slate-400">Wishlist masih kosong</p>
                    <p className="text-sm text-slate-400 mt-1 mb-6">Simpan tour favorit Anda untuk mudah ditemukan kembali</p>
                    <Link href="/tours" className="btn btn-primary btn-sm">Jelajahi Tour</Link>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence>
                        {wishlist.map((tour) => (
                            <motion.div
                                key={tour.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="card overflow-hidden group"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <button
                                        onClick={() => remove(tour.id)}
                                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-accent hover:bg-accent hover:text-white transition-all"
                                        title="Hapus dari wishlist"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <div className="absolute top-3 left-3">
                                        <span className="badge bg-white/90 text-primary text-xs">{tour.category}</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-primary mb-1 truncate">{tour.title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                        <span className="flex items-center gap-1"><MapPin size={11} /> {tour.location}</span>
                                        <span className="flex items-center gap-1"><Clock size={11} /> {tour.duration}</span>
                                        <span className="flex items-center gap-1 text-amber-500"><Star size={11} fill="currentColor" /> {tour.rating}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-lg font-bold text-accent">{formatPrice(tour.price)}</div>
                                            <div className="text-xs text-slate-400">per orang</div>
                                        </div>
                                        <Link href={`/tours/${tour.slug}`} className="btn btn-primary btn-sm text-xs">
                                            Lihat Tour
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
