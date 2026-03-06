"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Compass, Package, Users, Star } from "lucide-react";
import { useSiteSettings } from "@/lib/settings";

const icons = [Compass, Package, Users, Star];
const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
];

function parseValue(val: string): { num: number; decimal: boolean } {
    const cleaned = val.replace(/[^\d.,]/g, "").replace(",", ".");
    const num = parseFloat(cleaned) || 0;
    return { num, decimal: cleaned.includes(".") };
}

function CountUp({ value, suffix, decimal }: { value: number; suffix: string; decimal?: boolean }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const motionVal = useMotionValue(0);
    const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

    useEffect(() => {
        if (inView) motionVal.set(value);
    }, [inView, motionVal, value]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = decimal ? latest.toFixed(1) + suffix : Math.floor(latest).toLocaleString("id-ID") + suffix;
            }
        });
    }, [spring, decimal, suffix]);

    return <span ref={ref}>0{suffix}</span>;
}

export default function StatsBar() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const settings = useSiteSettings();

    const statItems = [1, 2, 3, 4].map((n, i) => {
        const value = settings.stats[`stat${n}Value` as keyof typeof settings.stats];
        const label = settings.stats[`stat${n}Label` as keyof typeof settings.stats];
        const suffixMatch = value.match(/[^\d.,]+$/);
        const suffix = suffixMatch ? suffixMatch[0] : "";
        const parsed = parseValue(value);
        return { icon: icons[i], value: parsed.num, suffix: suffix || "+", label, gradient: gradients[i], decimal: parsed.decimal };
    });

    return (
        <section ref={ref} className="relative -mt-8 z-20 px-4">
            <div className="container max-w-5xl">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/5 border border-white/50 p-6 lg:p-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {statItems.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex items-center gap-4 group"
                            >
                                <motion.div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                                    style={{ background: item.gradient }}
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <item.icon size={22} />
                                </motion.div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">
                                        <CountUp value={item.value} suffix={item.suffix} decimal={item.decimal} />
                                    </div>
                                    <div className="text-sm text-slate-400">{item.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
