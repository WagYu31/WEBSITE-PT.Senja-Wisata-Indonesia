"use client";

import { useEffect, useState, useRef } from "react";
import { Activity, Eye, Clock, MousePointerClick, Globe, Smartphone, Monitor, Tablet } from "lucide-react";

// Simulated page sources
const pageSources = [
    { page: "/", label: "Beranda", base: 40 },
    { page: "/tours", label: "Paket Wisata", base: 22 },
    { page: "/destinations", label: "Destinasi", base: 15 },
    { page: "/tours/raja-ampat-paradise", label: "Raja Ampat", base: 10 },
    { page: "/tours/bali-complete-experience", label: "Bali Package", base: 8 },
    { page: "/about", label: "Tentang Kami", base: 5 },
];

const trafficSources = [
    { source: "Google Search", pct: 48, color: "#4285F4" },
    { source: "Langsung", pct: 24, color: "#05073C" },
    { source: "Media Sosial", pct: 18, color: "#E1306C" },
    { source: "Referral", pct: 10, color: "#FC4C4D" },
];

function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function LiveVisitorWidget() {
    const [liveVisitors, setLiveVisitors] = useState(randomBetween(18, 35));
    const [todayViews, setTodayViews] = useState(randomBetween(1240, 1280));
    const [avgSession, setAvgSession] = useState("2m 34s");
    const [bounceRate, setBounceRate] = useState(randomBetween(38, 44));
    const [pageData, setPageData] = useState(pageSources.map(p => ({
        ...p, visitors: randomBetween(Math.floor(p.base * 0.7), Math.floor(p.base * 1.3))
    })));
    const [sparkline, setSparkline] = useState<number[]>(
        Array.from({ length: 20 }, () => randomBetween(12, 38))
    );
    const [deviceSplit] = useState({ desktop: 52, mobile: 40, tablet: 8 });
    const [dot, setDot] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const totalPageVisitors = pageData.reduce((s, p) => s + p.visitors, 0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Blink dot every 800ms
        const blinkInterval = setInterval(() => setDot(d => !d), 800);

        // Update live data every 4 seconds
        intervalRef.current = setInterval(() => {
            const delta = randomBetween(-3, 5);
            setLiveVisitors(prev => Math.max(8, prev + delta));
            setTodayViews(prev => prev + randomBetween(1, 4));
            setBounceRate(randomBetween(36, 46));
            setSparkline(prev => [...prev.slice(1), randomBetween(10, 42)]);
            setPageData(pageSources.map(p => ({
                ...p, visitors: randomBetween(Math.floor(p.base * 0.6), Math.floor(p.base * 1.5))
            })));
            setLastUpdated(new Date());

            // Randomize avg session
            const mins = randomBetween(1, 4);
            const secs = randomBetween(10, 59);
            setAvgSession(`${mins}m ${secs}s`);
        }, 4000);

        return () => {
            clearInterval(blinkInterval);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Sparkline SVG path
    const maxSpark = Math.max(...sparkline);
    const minSpark = Math.min(...sparkline);
    const sparkPath = sparkline.map((v, i) => {
        const x = (i / (sparkline.length - 1)) * 100;
        const y = 100 - ((v - minSpark) / (maxSpark - minSpark || 1)) * 90 - 5;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");

    return (
        <div className="card p-5 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center">
                        <Activity size={16} className="text-rose-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm" style={{ color: '#05073C' }}>Live Pengunjung</h3>
                        <p className="text-xs text-slate-400">Update tiap 4 detik</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className={`w-2 h-2 rounded-full bg-emerald-500 transition-opacity ${dot ? "opacity-100" : "opacity-20"}`} />
                    <span>Live</span>
                </div>
            </div>

            {/* Big Live Number + Sparkline */}
            <div className="flex items-end gap-4">
                <div>
                    <div className="text-4xl font-bold tabular-nums" style={{ color: '#05073C' }}>
                        {liveVisitors}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">pengunjung aktif sekarang</div>
                </div>
                <div className="flex-1 h-12 relative">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <defs>
                            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FC4C4D" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#FC4C4D" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path
                            d={`${sparkPath} L 100 100 L 0 100 Z`}
                            fill="url(#sparkGrad)"
                        />
                        <path d={sparkPath} fill="none" stroke="#FC4C4D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* Mini Stats Row */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1"><Eye size={11} /> Hari Ini</div>
                    <div className="font-bold text-sm tabular-nums" style={{ color: '#05073C' }}>{todayViews.toLocaleString('id')}</div>
                    <div className="text-xs text-slate-400">pageview</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1"><Clock size={11} /> Avg Session</div>
                    <div className="font-bold text-sm tabular-nums" style={{ color: '#05073C' }}>{avgSession}</div>
                    <div className="text-xs text-slate-400">durasi rata-rata</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1"><MousePointerClick size={11} /> Bounce</div>
                    <div className="font-bold text-sm tabular-nums" style={{ color: '#05073C' }}>{bounceRate}%</div>
                    <div className="text-xs text-slate-400">bounce rate</div>
                </div>
            </div>

            {/* Top Pages */}
            <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Halaman Terpopuler</h4>
                <div className="space-y-2">
                    {pageData.map((p) => (
                        <div key={p.page} className="flex items-center gap-2">
                            <div className="text-xs text-slate-500 w-28 truncate flex-shrink-0">{p.label}</div>
                            <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${(p.visitors / totalPageVisitors) * 100}%`, backgroundColor: '#05073C' }}
                                />
                            </div>
                            <div className="text-xs font-semibold tabular-nums w-6 text-right" style={{ color: '#05073C' }}>
                                {p.visitors}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Device Split */}
            <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Perangkat</h4>
                <div className="flex gap-3">
                    {[
                        { icon: Monitor, label: "Desktop", pct: deviceSplit.desktop, color: "#05073C" },
                        { icon: Smartphone, label: "Mobile", pct: deviceSplit.mobile, color: "#FC4C4D" },
                        { icon: Tablet, label: "Tablet", pct: deviceSplit.tablet, color: "#2BBEE8" },
                    ].map(d => (
                        <div key={d.label} className="flex-1 bg-slate-50 rounded-xl p-2.5 text-center">
                            <d.icon size={16} className="mx-auto mb-1" style={{ color: d.color }} />
                            <div className="text-xs font-bold tabular-nums">{d.pct}%</div>
                            <div className="text-xs text-slate-400">{d.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Traffic Sources */}
            <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Sumber Traffic</h4>
                <div className="space-y-2">
                    {trafficSources.map(s => (
                        <div key={s.source} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                            <div className="text-xs text-slate-500 flex-1">{s.source}</div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-16 bg-slate-100 rounded-full h-1.5">
                                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color, opacity: 0.7 }} />
                                </div>
                                <span className="text-xs font-semibold w-8 text-right tabular-nums">{s.pct}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Globe size={11} />
                    <span>Terakhir diperbarui: {lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                </div>
            </div>
        </div>
    );
}
