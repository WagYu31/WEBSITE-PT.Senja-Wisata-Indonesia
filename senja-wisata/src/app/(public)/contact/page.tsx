"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Instagram, Facebook, Youtube } from "lucide-react";

const contactInfo = [
    {
        icon: MapPin,
        title: "Alamat Kantor",
        lines: ["Jl. Wisata Indah No. 12", "Jakarta Selatan, 12345", "DKI Jakarta, Indonesia"],
        color: "bg-rose-50 text-rose-500",
    },
    {
        icon: Phone,
        title: "Telepon / WhatsApp",
        lines: ["+62 812-3456-7890", "+62 21-5555-1234"],
        color: "bg-emerald-50 text-emerald-500",
    },
    {
        icon: Mail,
        title: "Email",
        lines: ["info@senjawisata.com", "booking@senjawisata.com"],
        color: "bg-blue-50 text-blue-500",
    },
    {
        icon: Clock,
        title: "Jam Operasional",
        lines: ["Senin – Jumat: 08.00 – 17.00", "Sabtu: 09.00 – 15.00", "Minggu & Libur: Tutup"],
        color: "bg-amber-50 text-amber-500",
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setForm({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSent(false), 4000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Banner */}
            <div className="gradient-primary pt-32 pb-14">
                <div className="container">
                    <span className="italic font-serif text-blue text-lg">Hubungi Kami</span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mt-2 mb-2">Kontak & Lokasi</h1>
                    <p className="text-white/60">Beranda · Kontak</p>
                </div>
            </div>

            <div className="container py-14">
                {/* Google Maps + Info Kontak */}
                <div className="grid lg:grid-cols-5 gap-8 mb-12">

                    {/* Google Maps Embed */}
                    <div className="lg:col-span-3">
                        <div className="relative card overflow-hidden h-full min-h-[420px] rounded-2xl shadow-lg">
                            {/* Floating address badge */}
                            <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center">
                                    <MapPin size={14} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-primary leading-tight">PT. Senja Wisata Indonesia</p>
                                    <p className="text-[10px] text-slate-400">Jl. Wisata Indah No. 12, Jakarta Selatan</p>
                                </div>
                            </div>
                            <iframe
                                src="https://www.google.com/maps?q=-6.2363,106.8272&z=16&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: "420px" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokasi PT. Senja Wisata Indonesia"
                                className="block rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Info Kontak Cards */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {contactInfo.map((info) => (
                            <div key={info.title} className="card p-5 flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${info.color}`}>
                                    <info.icon size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-primary mb-1">{info.title}</h3>
                                    {info.lines.map((line, i) => (
                                        <p key={i} className="text-sm text-slate-500">{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Sosial Media */}
                        <div className="card p-5">
                            <h3 className="font-bold text-sm text-primary mb-3">Sosial Media</h3>
                            <div className="flex gap-3">
                                {[
                                    { icon: Instagram, label: "@senjawisata", color: "bg-pink-50 text-pink-500", href: "https://instagram.com" },
                                    { icon: Facebook, label: "Senja Wisata", color: "bg-blue-50 text-blue-600", href: "https://facebook.com" },
                                    { icon: Youtube, label: "Senja Wisata", color: "bg-red-50 text-red-500", href: "https://youtube.com" },
                                ].map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                                        className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl ${s.color} hover:opacity-80 transition-opacity`}>
                                        <s.icon size={18} />
                                        <span className="text-xs font-medium truncate w-full text-center">{s.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card p-8 max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-primary">Kirim Pesan</h2>
                        <p className="text-slate-400 mt-1 text-sm">Ada pertanyaan? Kami akan membalas dalam 1×24 jam.</p>
                    </div>

                    {sent ? (
                        <div className="flex flex-col items-center gap-3 py-10 text-emerald-600">
                            <CheckCircle size={48} strokeWidth={1.5} />
                            <p className="font-bold text-lg">Pesan berhasil terkirim!</p>
                            <p className="text-sm text-slate-400">Tim kami akan segera menghubungi Anda.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Nama Lengkap *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ahmad Santoso"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="ahmad@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1.5">Subjek</label>
                                <input
                                    type="text"
                                    placeholder="Pertanyaan tentang paket wisata..."
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1.5">Pesan *</label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className="form-input resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={sending}
                                className="btn btn-primary w-full gap-2 disabled:opacity-70"
                            >
                                {sending ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Kirim Pesan
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
