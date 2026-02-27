"use client";

import { use, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Star, CheckCircle, XCircle, Minus, Plus, Calendar, ChevronRight, Loader2, X, User, CreditCard, Phone } from "lucide-react";
import { tours } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

interface PassengerData {
    name: string;
    idNumber: string;
    birthDate: string;
    type: "adult" | "child";
}

// Declare Midtrans Snap on window
declare global {
    interface Window {
        snap?: {
            pay: (token: string, options: {
                onSuccess?: (result: Record<string, unknown>) => void;
                onPending?: (result: Record<string, unknown>) => void;
                onError?: (result: Record<string, unknown>) => void;
                onClose?: () => void;
            }) => void;
        };
    }
}

interface Props { params: Promise<{ slug: string }> }

const tabs = ["Overview", "Itinerary", "Termasuk", "Ulasan"] as const;

export default function TourDetailPage({ params }: Props) {
    const { slug } = use(params);
    const tour = tours.find((t) => t.slug === slug);
    if (!tour) notFound();

    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");
    const [activeImg, setActiveImg] = useState(0);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [date, setDate] = useState("");
    const [isBooking, setIsBooking] = useState(false);
    const [bookingError, setBookingError] = useState("");
    const [showPassengerForm, setShowPassengerForm] = useState(false);
    const [passengers, setPassengers] = useState<PassengerData[]>([]);
    const [contactPhone, setContactPhone] = useState("");
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const total = tour.price * (adults + children * 0.5);

    const openPassengerForm = () => {
        if (!isAuthenticated) { router.push("/login"); return; }
        if (!date) { setBookingError("Pilih tanggal berangkat terlebih dahulu"); return; }
        setBookingError("");
        // Initialize passengers array
        const pax: PassengerData[] = [];
        for (let i = 0; i < adults; i++) pax.push({ name: "", idNumber: "", birthDate: "", type: "adult" });
        for (let i = 0; i < children; i++) pax.push({ name: "", idNumber: "", birthDate: "", type: "child" });
        setPassengers(pax);
        setContactPhone("");
        setFormErrors([]);
        setShowPassengerForm(true);
    };

    const validatePassengerForm = (): boolean => {
        const errors: string[] = [];
        passengers.forEach((p, i) => {
            if (!p.name.trim()) errors.push(`Nama peserta ${i + 1} wajib diisi`);
            if (!p.idNumber.trim()) errors.push(`No. KTP/Paspor peserta ${i + 1} wajib diisi`);
            if (!p.birthDate) errors.push(`Tanggal lahir peserta ${i + 1} wajib diisi`);
        });
        if (!contactPhone.trim()) errors.push("No. HP pemesan wajib diisi");
        setFormErrors(errors);
        return errors.length === 0;
    };

    const updatePassenger = (index: number, field: keyof PassengerData, value: string) => {
        setPassengers(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
    };

    const handleBook = async () => {
        if (!validatePassengerForm()) return;
        setShowPassengerForm(false);
        setIsBooking(true);

        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tourId: tour.id,
                    tourDate: date,
                    adults,
                    children,
                    userId: user?.id,
                    userName: user?.name,
                    userEmail: user?.email,
                    contactPhone,
                    passengers,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setBookingError(data.error || "Gagal membuat booking");
                setIsBooking(false);
                return;
            }

            // Open Midtrans Snap popup
            if (window.snap && data.snapToken) {
                const orderId = data.orderId;
                window.snap.pay(data.snapToken, {
                    onSuccess: async () => {
                        // Confirm payment status immediately (webhook can't reach localhost in dev)
                        try {
                            await fetch("/api/booking/confirm", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ orderId }),
                            });
                        } catch { /* ignore */ }
                        router.push("/dashboard/trips?payment=success");
                    },
                    onPending: async (result: Record<string, unknown>) => {
                        // Capture VA number from Midtrans result and save to store
                        try {
                            const vaNumbers = result.va_numbers as Array<{ bank: string; va_number: string }> | undefined;
                            const va = vaNumbers?.[0];
                            if (va) {
                                await fetch("/api/booking/va", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ orderId, vaNumber: va.va_number, vaBank: va.bank }),
                                });
                            }
                        } catch { /* ignore */ }
                        router.push("/dashboard/trips?payment=pending");
                    },
                    onError: () => {
                        setBookingError("Pembayaran gagal. Silakan coba lagi.");
                        setIsBooking(false);
                    },
                    onClose: () => {
                        setIsBooking(false);
                    },
                });
            } else {
                // Fallback: redirect to Midtrans payment page
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    setBookingError("Midtrans Snap belum siap. Silakan muat ulang halaman.");
                    setIsBooking(false);
                }
            }
        } catch {
            setBookingError("Terjadi kesalahan. Silakan coba lagi.");
            setIsBooking(false);
        }
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

                            <button onClick={openPassengerForm} disabled={isBooking}
                                className="btn btn-primary w-full text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isBooking ? (
                                    <><Loader2 size={18} className="animate-spin" /> Memproses...</>
                                ) : (
                                    "Pesan Sekarang"
                                )}
                            </button>
                            {bookingError && (
                                <p className="text-xs text-red-500 text-center mt-2 font-medium">{bookingError}</p>
                            )}
                            <p className="text-xs text-slate-400 text-center mt-2">Tidak ada biaya tersembunyi</p>
                        </div>
                    </aside>
                </div>
            </div>

            {/* ===== MODAL: Data Peserta ===== */}
            {showPassengerForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 sm:p-5 flex items-center justify-between z-10 rounded-t-2xl">
                            <div>
                                <h3 className="text-lg font-bold text-primary">Data Peserta</h3>
                                <p className="text-xs text-slate-400">{tour.title} · {date}</p>
                            </div>
                            <button onClick={() => setShowPassengerForm(false)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-5 space-y-5">
                            {/* Validation errors */}
                            {formErrors.length > 0 && (
                                <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                                    <p className="text-xs font-semibold text-red-600 mb-1">Mohon lengkapi data berikut:</p>
                                    <ul className="text-xs text-red-500 space-y-0.5">
                                        {formErrors.slice(0, 3).map((e, i) => <li key={i}>• {e}</li>)}
                                        {formErrors.length > 3 && <li>...dan {formErrors.length - 3} lainnya</li>}
                                    </ul>
                                </div>
                            )}

                            {/* Contact Person */}
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Phone size={14} className="text-blue-500" />
                                    <span className="text-sm font-bold text-blue-700">Data Pemesan</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nama</label>
                                        <input type="text" value={user?.name || ""} disabled className="form-input text-sm bg-slate-50 opacity-70" />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Email</label>
                                        <input type="text" value={user?.email || ""} disabled className="form-input text-sm bg-slate-50 opacity-70" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="text-[11px] font-semibold text-slate-500 mb-1 block">No. HP / WhatsApp *</label>
                                        <input
                                            type="tel"
                                            value={contactPhone}
                                            onChange={e => setContactPhone(e.target.value)}
                                            placeholder="+62 812-xxxx-xxxx"
                                            className="form-input text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Per-passenger forms */}
                            {passengers.map((pax, idx) => (
                                <div key={idx} className="border border-slate-100 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${pax.type === "adult" ? "bg-primary" : "bg-blue"
                                            }`}>
                                            {idx + 1}
                                        </div>
                                        <span className="text-sm font-bold text-primary">
                                            Peserta {idx + 1}
                                        </span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${pax.type === "adult" ? "bg-primary/10 text-primary" : "bg-blue/10 text-blue"
                                            }`}>
                                            {pax.type === "adult" ? "Dewasa" : "Anak"}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nama Lengkap *</label>
                                            <div className="relative">
                                                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="text"
                                                    value={pax.name}
                                                    onChange={e => updatePassenger(idx, "name", e.target.value)}
                                                    placeholder="Sesuai KTP/Paspor"
                                                    className="form-input pl-9 text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[11px] font-semibold text-slate-500 mb-1 block">No. KTP / Paspor *</label>
                                                <div className="relative">
                                                    <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        value={pax.idNumber}
                                                        onChange={e => updatePassenger(idx, "idNumber", e.target.value)}
                                                        placeholder="3201xxxxxxxxxxxx"
                                                        className="form-input pl-9 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Tanggal Lahir *</label>
                                                <div className="relative">
                                                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="date"
                                                        value={pax.birthDate}
                                                        onChange={e => updatePassenger(idx, "birthDate", e.target.value)}
                                                        className="form-input pl-9 text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Summary & Submit */}
                            <div className="border-t border-slate-100 pt-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-500">Total Peserta</span>
                                    <span className="font-semibold text-primary">{adults + children} orang</span>
                                </div>
                                <div className="flex justify-between text-base font-bold mb-4">
                                    <span className="text-primary">Total Bayar</span>
                                    <span className="text-accent">{formatPrice(total)}</span>
                                </div>
                                <button
                                    onClick={handleBook}
                                    className="btn btn-primary w-full text-base flex items-center justify-center gap-2"
                                >
                                    Lanjut ke Pembayaran
                                </button>
                                <p className="text-[10px] text-slate-400 text-center mt-2">Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
