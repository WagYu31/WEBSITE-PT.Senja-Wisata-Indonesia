"use client";

import { motion } from "framer-motion";
import { Shield, Award, Headphones, CreditCard, MapPin, ThumbsUp } from "lucide-react";

const features = [
    { icon: Shield, title: "Terpercaya & Aman", desc: "15+ tahun pengalaman melayani ribuan wisatawan dengan standar keamanan tertinggi.", color: "text-blue bg-blue/10" },
    { icon: Award, title: "Paket Terbaik", desc: "Kurasi destinasi dan itinerary terbaik oleh tim expert kami yang berpengalaman.", color: "text-accent bg-accent/10" },
    { icon: Headphones, title: "Support 24/7", desc: "Tim kami siap membantu Anda kapan saja selama perjalanan, 24 jam sehari.", color: "text-emerald-600 bg-emerald-50" },
    { icon: CreditCard, title: "Harga Transparan", desc: "Tidak ada biaya tersembunyi. Semua sudah termasuk dalam paket yang Anda pilih.", color: "text-amber-600 bg-amber-50" },
    { icon: MapPin, title: "Guide Berpengalaman", desc: "Pemandu wisata profesional yang berpengalaman dan menguasai setiap destinasi.", color: "text-purple-600 bg-purple-50" },
    { icon: ThumbsUp, title: "Garansi Kepuasan", desc: "Tidak puas? Kami kembalikan uang Anda. Kepuasan Anda adalah prioritas utama kami.", color: "text-pink-600 bg-pink-50" },
];

export default function WhyChooseUs() {
    return (
        <section className="section gradient-primary text-white overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                <div className="text-center mb-12">
                    <span className="inline-block font-serif italic text-blue text-xl mb-3">Mengapa Kami?</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Kenapa Pilih Senja Wisata?</h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">Kami hadir dengan komitmen penuh untuk memberikan pengalaman wisata terbaik</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color} group-hover:scale-110 transition-transform`}>
                                <f.icon size={22} />
                            </div>
                            <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
