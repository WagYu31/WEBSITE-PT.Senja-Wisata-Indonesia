import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PT. Senja Wisata Indonesia — Liburan Impian Anda",
    template: "%s — Senja Wisata",
  },
  description:
    "Temukan paket wisata terbaik Indonesia. Dari Raja Ampat hingga Bali — kami menghadirkan pengalaman perjalanan tak terlupakan dengan harga terbaik.",
  keywords: ["wisata indonesia", "paket wisata", "tur bali", "raja ampat", "travel agent"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Senja Wisata Indonesia",
    title: "PT. Senja Wisata Indonesia — Liburan Impian Anda",
    description:
      "Temukan paket wisata terbaik Indonesia. Dari Raja Ampat hingga Bali — kami menghadirkan pengalaman perjalanan tak terlupakan dengan harga terbaik.",
    images: [
      {
        url: "https://fluentlya.com/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Senja Wisata Indonesia — Liburan Impian Anda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT. Senja Wisata Indonesia — Liburan Impian Anda",
    description:
      "Temukan paket wisata terbaik Indonesia. Dari Raja Ampat hingga Bali — kami menghadirkan pengalaman perjalanan tak terlupakan.",
    images: ["https://fluentlya.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  const snapUrl = isProduction
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

  return (
    <html lang="id" className={`${poppins.variable} ${playfair.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#05073C" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans antialiased bg-white text-primary-900">
        {children}
        <Script
          src={snapUrl}
          data-client-key={midtransClientKey}
          strategy="lazyOnload"
        />
        <Script id="sw-register" strategy="lazyOnload">{`
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {});
          }
        `}</Script>
      </body>
    </html>
  );
}

