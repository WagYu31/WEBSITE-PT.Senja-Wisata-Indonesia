"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Clock, Star, Trash2, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { tours as staticTours } from "@/lib/data";

interface WishlistItem {
    id: number;
    tour_id: number;
    title: string;
    slug: string;
    location: string;
    duration: string;
    price: number;
    image: string;
    category: string;
    rating?: number;
}

export default function WishlistPage() {
    const { user } = useAuthStore();
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = useCallback(async () => {
        if (!user?.id) return;
        try {
            const res = await fetch(`/api/wishlist?userId=${user.id}`);
            const data = await res.json();
            if (data.wishlists) {
                // Enrich with static data for missing fields (image, rating)
                const enriched = data.wishlists.map((w: WishlistItem) => {
                    const staticTour = staticTours.find(t => t.id === w.tour_id);
                    return {
                        ...w,
                        image: w.image || staticTour?.image || "",
                        rating: staticTour?.rating || 4.5,
                        slug: w.slug || staticTour?.slug || "",
                        category: w.category || staticTour?.category || "",
                        duration: w.duration || staticTour?.duration || "",
                        location: w.location || staticTour?.location || "",
                        title: w.title || staticTour?.title || "Tour",
                        price: w.price || staticTour?.price || 0,
                    };
                });
                setWishlist(enriched);
            }
        } catch (err) {
            console.error("Failed to fetch wishlist:", err);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const remove = async (tourId: number) => {
        // Optimistic UI
        setWishlist((w) => w.filter((t) => t.tour_id !== tourId));
        try {
            await fetch("/api/wishlist", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?.id, tourId }),
            });
        } catch {
            // If delete fails, re-fetch
            fetchWishlist();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-blue" size={32} />
            </div>
        );
    }

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
                                key={tour.tour_id}
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
                                        onClick={() => remove(tour.tour_id)}
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
