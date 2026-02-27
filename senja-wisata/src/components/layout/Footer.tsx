import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const footerLinks = {
    paketWisata: [
        { label: "Wisata Pantai", href: "/tours?category=Beach" },
        { label: "Wisata Budaya", href: "/tours?category=Culture" },
        { label: "Petualangan", href: "/tours?category=Adventure" },
        { label: "Paket Keluarga", href: "/tours?category=Family" },
        { label: "Honeymoon", href: "/tours?category=Honeymoon" },
    ],
    destinasi: [
        { label: "Bali", href: "/destinations" },
        { label: "Raja Ampat", href: "/destinations" },
        { label: "Yogyakarta", href: "/destinations" },
        { label: "Komodo", href: "/destinations" },
        { label: "Bromo", href: "/destinations" },
    ],
    perusahaan: [
        { label: "Tentang Kami", href: "/about" },
        { label: "Kontak", href: "/contact" },
        { label: "Blog", href: "#" },
        { label: "Karir", href: "#" },
        { label: "Mitra Wisata", href: "#" },
    ],
};

const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter/X" },
];

export default function Footer() {
    return (
        <footer className="text-white" style={{ backgroundColor: '#05073C' }}>
            <div className="container py-10 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-3">
                            <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
                                <rect x="5" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                                <rect x="22" y="3" width="11" height="14" rx="5.5" fill="#2BBEE8" />
                                <rect x="5" y="11" width="11" height="7" fill="#2BBEE8" />
                                <rect x="22" y="11" width="11" height="7" fill="#2BBEE8" />
                                <rect x="5" y="20" width="28" height="8" rx="4" fill="#2BBEE8" />
                                <rect x="10" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                                <rect x="20" y="30" width="8" height="6" rx="3" fill="#2BBEE8" />
                            </svg>
                            <div>
                                <div className="font-bold text-lg text-white">Senja Wisata</div>
                                <div className="text-[10px] text-white/50">PT. Senja Wisata Indonesia</div>
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-xs hidden md:block">
                            Menghadirkan pengalaman wisata terbaik ke seluruh penjuru Indonesia. Ribuan traveler telah mempercayakan perjalanan impian mereka kepada kami.
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-white/60 md:flex-col md:gap-3">
                            <a href="https://maps.google.com" className="flex items-center gap-1.5 hover:text-blue transition-colors">
                                <MapPin size={13} className="text-blue shrink-0" />
                                <span className="hidden md:inline">Jl. Wisata Indah No. 12, Jakarta Selatan 12345</span>
                                <span className="md:hidden">Jakarta Selatan</span>
                            </a>
                            <a href="tel:+628123456789" className="flex items-center gap-1.5 hover:text-blue transition-colors">
                                <Phone size={13} className="text-blue shrink-0" />
                                +62 812-3456-7890
                            </a>
                            <a href="mailto:info@senjawisata.com" className="flex items-center gap-1.5 hover:text-blue transition-colors">
                                <Mail size={13} className="text-blue shrink-0" />
                                info@senjawisata.com
                            </a>
                        </div>
                    </div>

                    {/* Links - 2 col grid on mobile */}
                    {Object.entries(footerLinks).map(([key, links]) => (
                        <div key={key}>
                            <h3 className="font-bold mb-2 md:mb-4 text-xs md:text-sm uppercase tracking-wider text-white/40">
                                {key === "paketWisata" ? "Paket Wisata" : key === "destinasi" ? "Destinasi" : "Perusahaan"}
                            </h3>
                            <ul className="flex flex-col gap-1.5 md:gap-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-xs md:text-sm text-white/60 hover:text-blue transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs md:text-sm text-white/40">
                        © 2025 PT. Senja Wisata Indonesia. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-blue flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                            >
                                <s.icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
