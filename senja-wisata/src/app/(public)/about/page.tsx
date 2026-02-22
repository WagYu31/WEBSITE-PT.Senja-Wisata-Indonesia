"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Award, Users, Globe, Heart, Star, Shield, Clock, CheckCircle, ArrowRight, Play } from "lucide-react";

// ─── Animated counter ────────────────────────────────────────────────────────
function CountUp({ end, suffix = "", decimal = false }: { end: number; suffix?: string; decimal?: boolean }) {
    const [val, setVal] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            let start = 0;
            const duration = 2000;
            const step = 16;
            const inc = end / (duration / step);
            const timer = setInterval(() => {
                start += inc;
                if (start >= end) { setVal(end); clearInterval(timer); }
                else setVal(decimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
            }, step);
        }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, decimal]);

    return <span ref={ref}>{decimal ? val.toFixed(1) : val.toLocaleString("id")}{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const stats = [
    { value: 10, suffix: "+", label: "Tahun Pengalaman", icon: Clock },
    { value: 15000, suffix: "+", label: "Happy Travelers", icon: Users },
    { value: 120, suffix: "+", label: "Destinasi", icon: Globe },
    { value: 4.9, suffix: "★", label: "Rating", icon: Star, decimal: true },
];

const values = [
    { icon: Heart, title: "Penuh Dedikasi", desc: "Setiap perjalanan dirancang dengan sepenuh hati demi pengalaman yang tak terlupakan.", grad: "from-rose-500 to-pink-600" },
    { icon: Shield, title: "Terpercaya & Aman", desc: "Berlisensi resmi Kemenpar RI. Keamanan Anda adalah prioritas utama kami.", grad: "from-blue-500 to-indigo-600" },
    { icon: Award, title: "10+ Tahun Berpengalaman", desc: "Lebih dari satu dekade melayani ribuan wisatawan dengan standar profesional.", grad: "from-amber-500 to-orange-600" },
    { icon: CheckCircle, title: "Harga Transparan", desc: "Tidak ada biaya tersembunyi. Semua sudah termasuk dalam harga paket.", grad: "from-emerald-500 to-teal-600" },
];

const team = [
    { name: "Ahmad Wijaya", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80", avatar: "AW", grad: "from-indigo-500 to-blue-600" },
    { name: "Sari Rahayu", role: "Head of Operations", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80", avatar: "SR", grad: "from-rose-500 to-pink-600" },
    { name: "Doni Pratama", role: "Senior Tour Guide", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&q=80", avatar: "DP", grad: "from-emerald-500 to-teal-600" },
    { name: "Lina Kusuma", role: "Customer Relations", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80", avatar: "LK", grad: "from-amber-500 to-orange-600" },
];

const milestones = [
    { year: "2014", event: "PT. Senja Wisata Indonesia resmi berdiri di Jakarta", dot: "bg-accent" },
    { year: "2016", event: "Ekspansi ke 30+ destinasi — Bali, Lombok, Raja Ampat", dot: "bg-blue-500" },
    { year: "2018", event: "Melayani lebih dari 5.000 wisatawan per tahun", dot: "bg-emerald-500" },
    { year: "2020", event: "Transformasi digital: platform booking online diluncurkan", dot: "bg-purple-500" },
    { year: "2022", event: "Raih penghargaan Travel Agent Terbaik Nasional", dot: "bg-amber-500" },
    { year: "2024", event: "15.000+ happy travelers & 120+ destinasi tercapai", dot: "bg-pink-500" },
];

const testimonials = [
    { name: "Rina Juliani", from: "Jakarta", text: "Pelayanan luar biasa! Tim Senja Wisata sangat profesional dari awal hingga akhir perjalanan.", rating: 5 },
    { name: "Budi Santoso", from: "Surabaya", text: "Raja Ampat bersama Senja Wisata — pengalaman terbaik dalam hidup saya!", rating: 5 },
    { name: "Dewi Lestari", from: "Bandung", text: "Harga bersaing, kualitas premium. Saya sudah 3x booking dan selalu puas!", rating: 5 },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* ════════ HERO ════════ */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background image */}
                <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    style={{ filter: "brightness(0.35)" }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 border border-white/30 backdrop-blur-sm bg-white/10 text-white px-5 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
                        🌅 PT. Senja Wisata Indonesia — Est. 2014
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-2xl">
                        Kami Mewujudkan<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300">
                            Impian Perjalanan
                        </span>
                        <br />Anda
                    </h1>
                    <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Lebih dari satu dekade menghubungkan jiwa petualang dengan keindahan nusantara dan dunia.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/tours"
                            className="flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all hover:scale-105 shadow-xl shadow-accent/30">
                            Lihat Paket Wisata <ArrowRight size={16} />
                        </Link>
                        <Link href="#cerita"
                            className="flex items-center gap-2 px-8 py-3.5 border-2 border-white/50 text-white font-bold rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all">
                            <Play size={15} /> Cerita Kami
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs animate-bounce">
                    <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
                    Scroll
                </div>
            </section>

            {/* ════════ STATS BAR ════════ */}
            <section className="bg-white border-b border-slate-100 py-0">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
                        {stats.map(({ value, suffix, label, icon: Icon, decimal }) => (
                            <div key={label} className="py-8 px-6 text-center group hover:bg-slate-50 transition-colors">
                                <Icon className="w-5 h-5 text-accent mx-auto mb-3 group-hover:scale-125 transition-transform" />
                                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                                    <CountUp end={value} suffix={suffix} decimal={decimal} />
                                </div>
                                <div className="text-sm text-slate-500 font-medium">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ STORY ════════ */}
            <section id="cerita" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        {/* Photo collage */}
                        <div className="relative h-[520px]">
                            <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&q=80"
                                alt="Trip" className="absolute top-0 left-0 w-64 h-72 object-cover rounded-3xl shadow-2xl" />
                            <img src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=500&q=80"
                                alt="Raja Ampat" className="absolute top-8 right-0 w-56 h-64 object-cover rounded-3xl shadow-xl border-4 border-white" />
                            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80"
                                alt="Bali" className="absolute bottom-0 left-12 w-56 h-52 object-cover rounded-3xl shadow-xl border-4 border-white" />
                            {/* Floating badge */}
                            <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 border border-slate-100">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center text-white font-bold text-xs">10+</div>
                                <div>
                                    <div className="text-xs text-slate-400">Pengalaman</div>
                                    <div className="font-bold text-primary text-sm">Tahun Melayani</div>
                                </div>
                            </div>
                        </div>

                        {/* Text */}
                        <div>
                            <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-4">
                                <div className="w-8 h-px bg-accent" /> Cerita Kami
                            </div>
                            <h2 className="text-4xl font-extrabold text-primary leading-tight mb-6">
                                Satu Dekade<br />Merangkai Kenangan
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-5">
                                PT. Senja Wisata Indonesia lahir pada 2014 dari keyakinan bahwa setiap orang berhak mendapatkan
                                pengalaman perjalanan yang luar biasa. Kami memulai dengan paket domestik sederhana,
                                dan kini telah berkembang menjadi salah satu biro wisata terpercaya di Indonesia.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                Dengan lebih dari <strong className="text-primary">15.000+ wisatawan</strong> yang telah
                                mempercayakan perjalanan mereka kepada kami, kami terus berinovasi — dari pemesanan digital
                                yang mudah hingga layanan guide profesional di setiap destinasi.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {["AW", "SR", "DP", "LK"].map(a => (
                                        <div key={a} className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-amber-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                            {a}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-500">Tim profesional siap membantu Anda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════ TIMELINE ════════ */}
            <section className="py-24 bg-gradient-to-br from-[#0B1F3A] to-[#1a3558] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-4">
                            <div className="w-8 h-px bg-accent" /> Perjalanan Kami <div className="w-8 h-px bg-accent" />
                        </div>
                        <h2 className="text-4xl font-extrabold">Jejak Langkah 10 Tahun</h2>
                    </div>
                    <div className="relative max-w-3xl mx-auto">
                        {/* Vertical line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
                        <div className="space-y-10">
                            {milestones.map(({ year, event, dot }, i) => (
                                <div key={year} className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                                    <div className={`flex-1 text-${i % 2 === 0 ? "right" : "left"}`}>
                                        <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/10 hover:bg-white/15 transition-colors">
                                            <div className="text-xs text-white/50 mb-1">{year}</div>
                                            <div className="text-sm font-medium text-white/90">{event}</div>
                                        </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full ${dot} border-4 border-[#0B1F3A] shrink-0 z-10 shadow-lg`} />
                                    <div className="flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════ VISI MISI ════════ */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute -left-20 top-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-4">
                                <div className="w-8 h-px bg-accent" /> Arah & Tujuan
                            </div>
                            <h2 className="text-4xl font-extrabold text-primary">Visi & Misi</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Visi */}
                            <div className="relative bg-gradient-to-br from-accent to-amber-500 p-px rounded-3xl shadow-xl shadow-accent/20">
                                <div className="bg-white rounded-3xl p-8">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center text-white text-2xl mb-6 shadow-lg">🌅</div>
                                    <h3 className="text-2xl font-extrabold text-primary mb-4">Visi</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        Menjadi biro perjalanan wisata <strong className="text-accent">terpercaya dan terdepan</strong> di Indonesia
                                        yang menghubungkan manusia dengan keindahan dunia melalui pengalaman perjalanan yang bermakna.
                                    </p>
                                </div>
                            </div>
                            {/* Misi */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg">🎯</div>
                                <h3 className="text-2xl font-extrabold text-primary mb-5">Misi</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Menyediakan paket wisata berkualitas dengan harga yang terjangkau",
                                        "Memberikan pelayanan prima dari awal pemesanan hingga kepulangan",
                                        "Mendukung pariwisata lokal dan pemberdayaan masyarakat daerah",
                                        "Terus berinovasi dalam layanan digital untuk kemudahan traveler",
                                    ].map(m => (
                                        <li key={m} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-3 h-3 text-emerald-500" />
                                            </div>
                                            <span className="text-slate-600">{m}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════ KEUNGGULAN ════════ */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-4">
                            <div className="w-8 h-px bg-accent" /> Kenapa Kami
                        </div>
                        <h2 className="text-4xl font-extrabold text-primary mb-3">Kenapa Pilih Senja Wisata?</h2>
                        <p className="text-slate-500 max-w-lg mx-auto">Ribuan traveler telah mempercayakan momen berharga mereka kepada kami</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {values.map(({ icon: Icon, title, desc, grad }) => (
                            <div key={title}
                                className="group relative rounded-3xl overflow-hidden border border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 p-7 cursor-default">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-slate-900 to-slate-800" />
                                <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="relative z-10 font-extrabold text-primary group-hover:text-white mb-2 transition-colors">{title}</h3>
                                <p className="relative z-10 text-slate-500 group-hover:text-slate-300 text-sm leading-relaxed transition-colors">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ TIM ════════ */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-4">
                            <div className="w-8 h-px bg-accent" /> Tim Kami
                        </div>
                        <h2 className="text-4xl font-extrabold text-primary mb-3">Orang-Orang di Balik Senja</h2>
                        <p className="text-slate-500">Profesional berpengalaman yang berdedikasi untuk setiap perjalanan Anda</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {team.map(({ name, role, img, grad }) => (
                            <div key={name} className="group text-center">
                                <div className="relative w-32 h-32 mx-auto mb-5">
                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${grad} blur-md opacity-0 group-hover:opacity-60 transition-opacity scale-110`} />
                                    <img src={img} alt={name}
                                        className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform" />
                                </div>
                                <h3 className="font-extrabold text-primary mb-0.5">{name}</h3>
                                <p className="text-accent text-xs font-bold uppercase tracking-wider">{role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ TESTIMONIAL STRIP ════════ */}
            <section className="py-16 bg-white border-y border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {testimonials.map(({ name, from, text, rating }) => (
                            <div key={name} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex text-amber-400 mb-3">{Array(rating).fill("★").join("")}</div>
                                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{text}"</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-amber-500 text-white text-xs font-bold flex items-center justify-center">
                                        {name[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-primary text-sm">{name}</div>
                                        <div className="text-xs text-slate-400">{from}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ SERTIFIKASI ════════ */}
            <section className="py-12 bg-slate-50">
                <div className="container mx-auto px-4">
                    <p className="text-center text-slate-400 text-xs font-semibold uppercase tracking-widest mb-8">Diakui & Bersertifikasi Oleh</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { icon: "📜", title: "Kemenpar RI", desc: "Izin Resmi" },
                            { icon: "✈️", title: "IATA", desc: "Akreditasi International" },
                            { icon: "🏛️", title: "ASITA", desc: "Asosiasi Travel Agent" },
                            { icon: "🔒", title: "ISO 9001", desc: "Manajemen Mutu" },
                            { icon: "⭐", title: "Top Agent 2022", desc: "Penghargaan Nasional" },
                        ].map(c => (
                            <div key={c.title}
                                className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-2xl">{c.icon}</span>
                                <div>
                                    <div className="font-bold text-primary text-sm">{c.title}</div>
                                    <div className="text-slate-400 text-xs">{c.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ CTA ════════ */}
            <section className="relative py-28 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1600&q=80"
                    alt="CTA" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.25)" }} />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/60 to-amber-500/40" />
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <div className="text-5xl mb-6">🌅</div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Siap Memulai Petualangan?</h2>
                    <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                        Bergabunglah dengan ribuan traveler yang telah merasakan pengalaman perjalanan terbaik bersama kami.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        <Link href="/tours"
                            className="flex items-center gap-2 px-8 py-4 bg-white text-accent font-extrabold rounded-2xl hover:bg-slate-100 transition-all hover:scale-105 shadow-2xl">
                            Lihat Paket Wisata <ArrowRight size={16} />
                        </Link>
                        <Link href="/contact"
                            className="flex items-center gap-2 px-8 py-4 border-2 border-white/60 text-white font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm">
                            <Mail size={16} /> Hubungi Kami
                        </Link>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
                        <span className="flex items-center gap-1.5"><MapPin size={13} /> Jl. Sudirman No. 45, Jakarta Pusat</span>
                        <span className="flex items-center gap-1.5"><Phone size={13} /> +62 21 5555 8888</span>
                        <span className="flex items-center gap-1.5"><Mail size={13} /> info@senjawisata.co.id</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
