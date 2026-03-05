"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LiveChatWidget from "@/components/ui/LiveChatWidget";
import Script from "next/script";
import { SiteSettingsProvider } from "@/lib/settings";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <SiteSettingsProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <LiveChatWidget />
            {/* Midtrans Snap JS */}
            <Script
                src={
                    process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
                        ? "https://app.midtrans.com/snap/snap.js"
                        : "https://app.sandbox.midtrans.com/snap/snap.js"
                }
                data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
                strategy="lazyOnload"
            />
        </SiteSettingsProvider>
    );
}
