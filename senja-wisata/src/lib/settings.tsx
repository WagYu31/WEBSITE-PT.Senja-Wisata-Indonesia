"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

// Default settings (same as admin)
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

export type SiteSettings = typeof DEFAULT_SETTINGS;

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function useSiteSettings() {
    return useContext(SiteSettingsContext);
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

    useEffect(() => {
        fetch("/api/settings")
            .then(r => r.json())
            .then(data => {
                if (data.settings) {
                    setSettings(prev => ({
                        ...prev,
                        ...data.settings,
                        hero: { ...prev.hero, ...data.settings.hero },
                        stats: { ...prev.stats, ...data.settings.stats },
                        company: { ...prev.company, ...data.settings.company },
                        social: { ...prev.social, ...data.settings.social },
                        newsletter: { ...prev.newsletter, ...data.settings.newsletter },
                        seo: { ...prev.seo, ...data.settings.seo },
                    }));
                }
            })
            .catch(() => { /* use defaults */ });
    }, []);

    return (
        <SiteSettingsContext.Provider value={settings}>
            {children}
        </SiteSettingsContext.Provider>
    );
}

export { DEFAULT_SETTINGS };
