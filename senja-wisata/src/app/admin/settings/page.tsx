"use client";

import { useState, useEffect } from "react";
import {
    Save, Globe, Image, Phone, Mail, MapPin,
    Instagram, Facebook, Youtube, Twitter,
    LayoutTemplate, Bell, CheckCircle, Eye, RefreshCw
} from "lucide-react";
import Link from "next/link";

// Default settings
const DEFAULT_SETTINGS = {
    hero: {
        tagline: "✈ Explore The World",
        title1: "Hemat &",
        title2: "Nikmati",
        titleAccent: "Terbaik",
        subtitle: "Kami menghadirkan pengalaman wisata tak terlupakan ke seluruh destinasi impian Indonesia dengan harga terbaik dan pelayanan premium.",
        ctaPrimary: "Jelajahi Paket",
        ctaSecondary: "Tentang Kami",
    },
    stats: {
        stat1Value: "120+",
        stat1Label: "Destinasi",
        stat2Value: "500+",
        stat2Label: "Paket Wisata",
        stat3Value: "15.000+",
        stat3Label: "Happy Travelers",
        stat4Value: "4.9",
        stat4Label: "Rating Rata-rata",
    },
    company: {
        name: "PT. Senja Wisata Indonesia",
        phone: "+62 812-3456-7890",
        email: "info@senjawisata.com",
        address: "Jl. Wisata Indah No. 12, Jakarta Selatan 12345",
        copyright: "© 2025 PT. Senja Wisata Indonesia. All rights reserved.",
    },
    social: {
        instagram: "#",
        facebook: "#",
        youtube: "#",
        twitter: "#",
    },
    newsletter: {
        show: true,
        title: "Dapatkan Penawaran Eksklusif",
        subtitle: "Daftar newsletter kami dan dapatkan promo, tips wisata, dan penawaran eksklusif langsung di inbox Anda.",
    },
    seo: {
        siteTitle: "PT. Senja Wisata Indonesia — Liburan Impian Anda",
        metaDescription: "Temukan paket wisata terbaik ke seluruh Indonesia. Raja Ampat, Bali, Komodo, Bromo dan lebih dari 120 destinasi pilihan.",
        keywords: "wisata indonesia, paket tour, liburan, travel agent",
    },
};

type SettingsData = typeof DEFAULT_SETTINGS;

const STORAGE_KEY = "sw-landing-settings";

const tabs = [
    { id: "hero", label: "Hero Section", icon: LayoutTemplate },
    { id: "stats", label: "Stats", icon: Globe },
    { id: "company", label: "Info Perusahaan", icon: Phone },
    { id: "social", label: "Sosial Media", icon: Instagram },
    { id: "newsletter", label: "Newsletter", icon: Mail },
    { id: "seo", label: "SEO", icon: Globe },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("hero");
    const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
    const [saved, setSaved] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        // Load from API first, fallback to localStorage
        fetch("/api/settings")
            .then(r => r.json())
            .then(data => {
                if (data.settings) {
                    setSettings(prev => ({ ...prev, ...data.settings }));
                } else {
                    // Fallback to localStorage
                    const stored = localStorage.getItem(STORAGE_KEY);
                    if (stored) {
                        try { setSettings(JSON.parse(stored)); } catch { /* ignore */ }
                    }
                }
            })
            .catch(() => {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    try { setSettings(JSON.parse(stored)); } catch { /* ignore */ }
                }
            });
    }, []);

    const updateSetting = (section: keyof SettingsData, key: string, value: string | boolean) => {
        setSettings(prev => ({
            ...prev,
            [section]: { ...prev[section], [key]: value }
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        // Save to both API and localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ settings }),
            });
            const data = await res.json();
            if (res.ok) {
                setSaved(true);
                setHasChanges(false);
                setTimeout(() => setSaved(false), 3000);
            } else {
                alert("Gagal menyimpan: " + (data.error || "Unknown error"));
            }
        } catch {
            // Fallback: at least saved to localStorage
            setSaved(true);
            setHasChanges(false);
            setTimeout(() => setSaved(false), 3000);
        }
    };

    const handleReset = () => {
        setSettings(DEFAULT_SETTINGS);
        setHasChanges(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold" style={{ color: '#05073C' }}>Pengaturan Landing Page</h2>
                    <p className="text-sm text-slate-400 mt-0.5">Kustomisasi konten dan tampilan website publik</p>
                </div>
                <div className="flex gap-2 self-start sm:self-auto">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                    >
                        <Eye size={15} /> Preview Website
                    </Link>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                    >
                        <RefreshCw size={15} /> Reset Default
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{ backgroundColor: saved ? '#059669' : '#FC4C4D' }}
                    >
                        {saved ? <><CheckCircle size={15} /> Tersimpan!</> : <><Save size={15} /> Simpan</>}
                    </button>
                </div>
            </div>

            {/* Unsaved changes banner */}
            {hasChanges && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2 text-amber-700 text-sm font-medium">
                    <Bell size={15} />
                    Ada perubahan yang belum disimpan. Klik &quot;Simpan&quot; untuk menyimpan perubahan.
                </div>
            )}

            <div className="flex gap-6">
                {/* Tabs sidebar */}
                <div className="w-48 shrink-0">
                    <nav className="space-y-1">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${activeTab === tab.id
                                        ? "text-white"
                                        : "text-slate-500 hover:bg-slate-100"
                                        }`}
                                    style={activeTab === tab.id ? { backgroundColor: '#05073C' } : {}}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Hero Tab */}
                    {activeTab === "hero" && (
                        <div className="card p-6 space-y-5">
                            <h3 className="font-bold text-slate-800 pb-3 border-b border-slate-100">Hero Section</h3>
                            <Field label="Tagline (kecil di atas judul)" value={settings.hero.tagline} onChange={v => updateSetting("hero", "tagline", v)} />
                            <div className="grid grid-cols-2 gap-4">
                                <Field label='Judul Baris 1 (e.g. "Hemat &")' value={settings.hero.title1} onChange={v => updateSetting("hero", "title1", v)} />
                                <Field label='Judul Baris 2 italic (e.g. "Nikmati")' value={settings.hero.title2} onChange={v => updateSetting("hero", "title2", v)} />
                            </div>
                            <Field label='Kata Aksen (highlight merah, e.g. "Terbaik")' value={settings.hero.titleAccent} onChange={v => updateSetting("hero", "titleAccent", v)} />
                            <Field label="Subtitle/Deskripsi" value={settings.hero.subtitle} onChange={v => updateSetting("hero", "subtitle", v)} multiline />
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Tombol CTA Utama" value={settings.hero.ctaPrimary} onChange={v => updateSetting("hero", "ctaPrimary", v)} />
                                <Field label="Tombol CTA Sekunder" value={settings.hero.ctaSecondary} onChange={v => updateSetting("hero", "ctaSecondary", v)} />
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-500">
                                <p className="font-semibold text-slate-700 mb-1">💡 Preview Judul:</p>
                                <p className="text-2xl font-bold" style={{ color: '#05073C' }}>
                                    {settings.hero.title1} <em>{settings.hero.title2}</em>{" "}
                                    <span style={{ color: '#FC4C4D' }}>{settings.hero.titleAccent}</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Stats Tab */}
                    {activeTab === "stats" && (
                        <div className="card p-6 space-y-5">
                            <h3 className="font-bold text-slate-800 pb-3 border-b border-slate-100">Stats Bar (angka-angka keunggulan)</h3>
                            <p className="text-sm text-slate-500">Ditampilkan di navbar stats bar dan di hero section sebagai mini stats.</p>
                            {[1, 2, 3, 4].map(n => (
                                <div key={n} className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                                    <Field label={`Stat ${n} — Nilai`} value={settings.stats[`stat${n}Value` as keyof typeof settings.stats]} onChange={v => updateSetting("stats", `stat${n}Value`, v)} />
                                    <Field label={`Stat ${n} — Label`} value={settings.stats[`stat${n}Label` as keyof typeof settings.stats]} onChange={v => updateSetting("stats", `stat${n}Label`, v)} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Company Tab */}
                    {activeTab === "company" && (
                        <div className="card p-6 space-y-5">
                            <h3 className="font-bold text-slate-800 pb-3 border-b border-slate-100">Informasi Perusahaan</h3>
                            <p className="text-sm text-slate-500">Ditampilkan di footer website.</p>
                            <Field label="Nama Perusahaan" value={settings.company.name} onChange={v => updateSetting("company", "name", v)} />
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Nomor Telepon" value={settings.company.phone} onChange={v => updateSetting("company", "phone", v)} icon={<Phone size={14} />} />
                                <Field label="Email" value={settings.company.email} onChange={v => updateSetting("company", "email", v)} icon={<Mail size={14} />} />
                            </div>
                            <Field label="Alamat" value={settings.company.address} onChange={v => updateSetting("company", "address", v)} icon={<MapPin size={14} />} multiline />
                            <Field label="Teks Copyright" value={settings.company.copyright} onChange={v => updateSetting("company", "copyright", v)} />
                        </div>
                    )}

                    {/* Social Media Tab */}
                    {activeTab === "social" && (
                        <div className="card p-6 space-y-5">
                            <h3 className="font-bold text-slate-800 pb-3 border-b border-slate-100">Sosial Media</h3>
                            <p className="text-sm text-slate-500">URL akun sosial media — ditampilkan di footer. Isi &quot;#&quot; jika belum ada.</p>
                            <Field label="Instagram" value={settings.social.instagram} onChange={v => updateSetting("social", "instagram", v)} icon={<Instagram size={14} />} placeholder="https://instagram.com/senjawisata" />
                            <Field label="Facebook" value={settings.social.facebook} onChange={v => updateSetting("social", "facebook", v)} icon={<Facebook size={14} />} placeholder="https://facebook.com/senjawisata" />
                            <Field label="YouTube" value={settings.social.youtube} onChange={v => updateSetting("social", "youtube", v)} icon={<Youtube size={14} />} placeholder="https://youtube.com/@senjawisata" />
                            <Field label="Twitter / X" value={settings.social.twitter} onChange={v => updateSetting("social", "twitter", v)} icon={<Twitter size={14} />} placeholder="https://twitter.com/senjawisata" />
                        </div>
                    )}

                    {/* Newsletter Tab */}
                    {activeTab === "newsletter" && (
                        <div className="card p-6 space-y-5">
                            <h3 className="font-bold text-slate-800 pb-3 border-b border-slate-100">Seksi Newsletter</h3>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-semibold text-slate-700 text-sm">Tampilkan Seksi Newsletter</p>
                                    <p className="text-xs text-slate-500">Aktifkan/nonaktifkan bagian newsletter di landing page</p>
                                </div>
                                <button
                                    onClick={() => updateSetting("newsletter", "show", !settings.newsletter.show)}
                                    className={`w-11 h-6 rounded-full transition-all relative ${settings.newsletter.show ? "" : "bg-slate-300"}`}
                                    style={{ backgroundColor: settings.newsletter.show ? '#05073C' : undefined }}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${settings.newsletter.show ? "left-6" : "left-1"}`} />
                                </button>
                            </div>
                            {settings.newsletter.show && (
                                <>
                                    <Field label="Judul Newsletter" value={settings.newsletter.title} onChange={v => updateSetting("newsletter", "title", v)} />
                                    <Field label="Subtitle/Deskripsi" value={settings.newsletter.subtitle} onChange={v => updateSetting("newsletter", "subtitle", v)} multiline />
                                </>
                            )}
                        </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === "seo" && (
                        <div className="card p-6 space-y-5">
                            <h3 className="font-bold text-slate-800 pb-3 border-b border-slate-100">SEO & Meta Tags</h3>
                            <p className="text-sm text-slate-500">Pengaturan ini mempengaruhi bagaimana website muncul di hasil pencarian Google.</p>
                            <Field label="Site Title (judul tab browser)" value={settings.seo.siteTitle} onChange={v => updateSetting("seo", "siteTitle", v)} />
                            <Field label="Meta Description (deskripsi di Google)" value={settings.seo.metaDescription} onChange={v => updateSetting("seo", "metaDescription", v)} multiline />
                            <Field label="Keywords (pisahkan dengan koma)" value={settings.seo.keywords} onChange={v => updateSetting("seo", "keywords", v)} />
                            <div className="bg-slate-50 rounded-xl p-4 text-sm">
                                <p className="font-semibold text-slate-700 mb-2">📱 Preview Google Search:</p>
                                <p className="text-blue-600 font-medium truncate">{settings.seo.siteTitle}</p>
                                <p className="text-green-600 text-xs">localhost:3000</p>
                                <p className="text-slate-600 text-xs mt-1 line-clamp-2">{settings.seo.metaDescription}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Reusable field component
function Field({
    label, value, onChange, multiline = false, placeholder, icon
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    multiline?: boolean;
    placeholder?: string;
    icon?: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-3 text-slate-400">{icon}</span>
                )}
                {multiline ? (
                    <textarea
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        placeholder={placeholder}
                        rows={3}
                        className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none transition-all"
                        style={{ paddingLeft: icon ? '2.25rem' : undefined }}
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                        style={{ paddingLeft: icon ? '2.25rem' : undefined }}
                    />
                )}
            </div>
        </div>
    );
}
