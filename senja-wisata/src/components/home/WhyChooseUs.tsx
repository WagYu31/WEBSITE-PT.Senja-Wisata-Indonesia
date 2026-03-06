"use client";

import { motion } from "framer-motion";
import { Shield, Award, Headphones, CreditCard, MapPin, ThumbsUp } from "lucide-react";

const features = [
    { icon: Shield, title: "Terpercaya & Aman", desc: "15+ tahun pengalaman melayani ribuan wisatawan dengan standar keamanan tertinggi.", gradient: "linear-gradient(135deg, #667eea, #764ba2)" },
    { icon: Award, title: "Paket Terbaik", desc: "Kurasi destinasi dan itinerary terbaik oleh tim expert yang berpengalaman.", gradient: "linear-gradient(135deg, #f093fb, #f5576c)" },
    { icon: Headphones, title: "Support 24/7", desc: "Tim kami siap membantu Anda kapan saja selama perjalanan, 24 jam sehari.", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)" },
    { icon: CreditCard, title: "Harga Transparan", desc: "Tidak ada biaya tersembunyi. Semua sudah termasuk dalam paket pilihan.", gradient: "linear-gradient(135deg, #fa709a, #fee140)" },
    { icon: MapPin, title: "Guide Profesional", desc: "Pemandu wisata profesional yang berpengalaman dan menguasai setiap destinasi.", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)" },
    { icon: ThumbsUp, title: "Garansi Kepuasan", desc: "Tidak puas? Kami kembalikan uang Anda. Kepuasan Anda adalah prioritas utama.", gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)" },
];

export default function WhyChooseUs() {
    return (
        <section className="section overflow-hidden relative" style={{ background: "linear-gradient(135deg, #05073C 0%, #0f2027 40%, #1a3050 100%)" }}>
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(43,190,232,0.08) 0%, transparent 70%)", top: "-20%", right: "0%" }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(252,76,77,0.06) 0%, transparent 70%)", bottom: "-10%", left: "10%" }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
            </div>

            <div className="container relative z-10">
                <div className="text-center mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-[#2BBEE8] mb-4"
                    >
                        ✨ Mengapa Kami?
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-bold text-white mb-4"
                    >
                        Kenapa Pilih{" "}
                        <span className="bg-gradient-to-r from-[#2BBEE8] to-[#7C3AED] bg-clip-text text-transparent">
                            Senja Wisata?
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 text-lg max-w-2xl mx-auto"
                    >
                        Kami hadir dengan komitmen penuh untuk memberikan pengalaman wisata terbaik
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="relative bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 group overflow-hidden"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `${f.gradient}`, filter: "blur(40px)", transform: "scale(0.8)" }} />

                            <div className="relative z-10">
                                <motion.div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                                    style={{ background: f.gradient }}
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                >
                                    <f.icon size={22} />
                                </motion.div>
                                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#2BBEE8] transition-colors">{f.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{f.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
