"use client";

import { use, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Star, CheckCircle, XCircle, Minus, Plus, Calendar, ChevronRight } from "lucide-react";
import { tours } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

interface Props { params: Promise<{ slug: string }> }

const tabs = ["Overview", "Itinerary", "Termasuk", "Ulasan"] as const;

export default function TourDetailPage({ params }: Props) {
    const { slug } = use(params);
    const tour = tours.find((t) => t.slug === slug);
    if (!tour) notFound();

    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");
    const [activeImg, setActiveImg] = useState(0);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [date, setDate] = useState("");
    const total = tour.price * (adults + children * 0.5);

    const handleBook = () => {
        if (!isAuthenticated) { router.push("/login"); return; }
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="relative h-[60vh] min-h-[400px] bg-primary">
                <Image src={tour.gallery[activeImg] || tour.image} alt={tour.title} fill className="object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                <div className="absolute bottom-6 left-0 right-0 container">
                    <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                        <a href="/" className="hover:text-white">Home</a> <ChevronRight size={14} />
                        <a href="/tours" className="hover:text-white">Tours</a> <ChevronRight size={14} />
                        <span className="text-white">{tour.title}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                        {tour.badge && <span className="badge badge-accent">{tour.badge}</span>}
                        <span className="badge bg-white/20 text-white">{tour.category}</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{tour.title}</h1>
                    <div className="flex items-center gap-4 text-white/80 text-sm flex-wrap">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {tour.location}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {tour.duration}</span>
                        <span className="flex items-center gap-1"><Users size={14} /> Max {tour.maxPax} pax</span>
                        <span className="flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400" /> {tour.rating} ({tour.reviews} ulasan)</span>
                    </div>
                </div>
            </div>

            {/* Gallery thumbnails */}
            {tour.gallery.length > 1 && (
                <div className="container mt-4 flex gap-2">
                    {tour.gallery.map((img, i) => (
                        <button key={i} onClick={() => setActiveImg(i)} className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"}`}>
                            <Image src={img} alt="" fill className="object-cover" />
                        </button>
                    ))}
                </div>
            )}

            <div className="container py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        {/* Tabs */}
                        <div className="flex gap-1 border-b border-slate-200 mb-6 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-3 font-semibold text-sm whitespace-nowrap transition-all border-b-2 -mb-px ${activeTab === tab ? "text-accent border-accent" : "text-slate-400 border-transparent hover:text-primary"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab panels */}
                        {activeTab === "Overview" && (
                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-600 leading-relaxed text-base">{tour.description}</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                                    {[{ label: "Durasi", val: tour.duration }, { label: "Max Peserta", val: `${tour.maxPax} orang` }, { label: "Min. Usia", val: `${tour.minAge} tahun` }].map((d) => (
                                        <div key={d.label} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                                            <div className="text-xs text-slate-400 mb-1">{d.label}</div>
                                            <div className="font-bold text-primary">{d.val}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "Itinerary" && (
                            <div className="relative border-l-2 border-blue/20 ml-4 pl-6 flex flex-col gap-6">
                                {tour.itinerary.map((day) => (
                                    <div key={day.day} className="relative">
                                        <div className="absolute -left-[33px] w-6 h-6 bg-blue rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-[10px]">
                                            {day.day}
                                        </div>
                                        <div className="card p-4">
                                            <div className="text-xs text-blue font-semibold mb-1">Hari {day.day}</div>
                                            <h4 className="font-bold text-primary mb-1">{day.title}</h4>
                                            <p className="text-slate-500 text-sm">{day.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "Termasuk" && (
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold mb-3 text-primary">✅ Termasuk</h4>
                                    <div className="flex flex-col gap-2">
                                        {tour.includes.map((inc) => (
                                            <div key={inc} className="flex items-center gap-2 text-slate-600 text-sm">
                                                <CheckCircle size={16} className="text-emerald-500 shrink-0" /> {inc}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-3 text-primary">❌ Tidak Termasuk</h4>
                                    <div className="flex flex-col gap-2">
                                        {["Penerbangan domestik", "Asuransi perjalanan", "Tips pemandu", "Minuman tambahan", "Pengeluaran pribadi"].map((ex) => (
                                            <div key={ex} className="flex items-center gap-2 text-slate-500 text-sm">
                                                <XCircle size={16} className="text-slate-300 shrink-0" /> {ex}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "Ulasan" && (
                            <div className="space-y-4">
                                {[{ name: "Ahmad R.", rating: 5, text: "Pengalaman luar biasa! Highly recommended.", date: "Jan 2025" },
                                { name: "Sari D.", rating: 5, text: "Pelayanan sangat profesional dan ramah.", date: "Des 2024" }].map((r, i) => (
                                    <div key={i} className="card p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={13} className={s <= r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />)}
                                            <span className="text-xs text-slate-400 ml-2">{r.date}</span>
                                        </div>
                                        <p className="text-slate-600 text-sm italic">"{r.text}"</p>
                                        <p className="text-sm font-semibold text-primary mt-2">— {r.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Booking Widget */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="card p-5 sticky top-24">
                            <div className="mb-1 text-sm text-slate-400">Mulai dari</div>
                            {tour.originalPrice && <div className="line-through text-slate-400 text-sm">{formatPrice(tour.originalPrice)}</div>}
                            <div className="text-3xl font-bold text-accent mb-1">{formatPrice(tour.price)}</div>
                            <div className="text-xs text-slate-400 mb-5">per orang</div>

                            {/* Date */}
                            <div className="mb-4">
                                <label className="form-label">Tanggal Berangkat</label>
                                <div className="relative">
                                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue" />
                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input pl-9 text-sm" min={new Date().toISOString().split("T")[0]} />
                                </div>
                            </div>

                            {/* Guests */}
                            {[["Dewasa", adults, setAdults], ["Anak (50%)", children, setChildren]].map(([label, count, setCount]) => (
                                <div key={label as string} className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="font-semibold text-sm text-primary">{label as string}</div>
                                        <div className="text-xs text-slate-400">{label === "Dewasa" ? "12+ tahun" : "< 12 tahun"}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => (setCount as any)(Math.max(label === "Dewasa" ? 1 : 0, (count as number) - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-6 text-center font-bold">{count as number}</span>
                                        <button onClick={() => (setCount as any)((count as number) + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Price breakdown */}
                            <div className="border-t border-slate-100 pt-4 mb-4 text-sm space-y-2">
                                <div className="flex justify-between text-slate-500">
                                    <span>{adults} Dewasa × {formatPrice(tour.price)}</span>
                                    <span>{formatPrice(tour.price * adults)}</span>
                                </div>
                                {children > 0 && (
                                    <div className="flex justify-between text-slate-500">
                                        <span>{children} Anak × {formatPrice(tour.price * 0.5)}</span>
                                        <span>{formatPrice(tour.price * children * 0.5)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-primary text-base border-t border-slate-100 pt-2 mt-2">
                                    <span>Total</span>
                                    <span className="text-accent">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <button onClick={handleBook} className="btn btn-primary w-full text-base">
                                Pesan Sekarang
                            </button>
                            <p className="text-xs text-slate-400 text-center mt-2">Tidak ada biaya tersembunyi</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
