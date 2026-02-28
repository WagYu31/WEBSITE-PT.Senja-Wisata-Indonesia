"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Tour } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

interface TourCardProps {
    tour: Tour;
    index?: number;
}

const badgeColors: Record<string, string> = {
    Terpopuler: "bg-accent text-white",
    "Hot Deal": "bg-amber-500 text-white",
    Popular: "bg-blue text-white",
    New: "bg-emerald-500 text-white",
};

export default function TourCard({ tour, index = 0 }: TourCardProps) {
    const { user } = useAuthStore();
    const toggle = useWishlistStore((s) => s.toggle);
    const isWishlisted = useWishlistStore((s) => s.has(tour.id));
    const syncFromDB = useWishlistStore((s) => s.syncFromDB);

    useEffect(() => {
        if (user?.id) syncFromDB(user.id);
    }, [user?.id, syncFromDB]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/tours/${tour.slug}`} className="group card block h-full">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                    <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    {tour.badge && (
                        <div className={cn("absolute top-3 left-3 badge text-xs", badgeColors[tour.badge] || "bg-primary text-white")}>
                            {tour.badge}
                        </div>
                    )}

                    {/* Rating badge */}
                    <div className="absolute top-3 right-12 badge bg-white/90 text-primary font-bold text-xs">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        {tour.rating}
                    </div>

                    {/* Wishlist */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggle(tour.id, user?.id);
                        }}
                        className={cn(
                            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                            isWishlisted
                                ? "bg-accent text-white"
                                : "bg-white/80 text-slate-500 hover:bg-accent hover:text-white"
                        )}
                    >
                        <Heart size={15} className={cn(isWishlisted && "fill-white")} />
                    </button>

                    {/* Category & Duration */}
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                        <span className="badge bg-primary/80 text-white text-[10px]">{tour.category}</span>
                        <span className="badge bg-primary/80 text-white text-[10px]">
                            <Clock size={9} /> {tour.duration}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-base text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                            {tour.title}
                        </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-3">
                        <MapPin size={13} />
                        <span className="truncate">{tour.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                size={13}
                                className={s <= Math.round(tour.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                            />
                        ))}
                        <span className="text-sm font-semibold text-primary ml-1">{tour.rating}</span>
                        <span className="text-slate-400 text-sm">({tour.reviews} ulasan)</span>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex items-end justify-between">
                        <div>
                            <div className="text-xs text-slate-400 mb-0.5">Mulai dari</div>
                            {tour.originalPrice && tour.originalPrice > tour.price && (
                                <div className="text-xs text-slate-400 line-through">{formatPrice(tour.originalPrice)}</div>
                            )}
                            <div className="text-lg font-bold text-accent">{formatPrice(tour.price)}</div>
                            <div className="text-xs text-slate-400">/ orang</div>
                        </div>
                        <span className="btn btn-primary btn-sm text-xs group-hover:shadow-lg">
                            Lihat Detail
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
