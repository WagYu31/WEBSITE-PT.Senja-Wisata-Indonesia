import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-primary-900">
        {children}
      </body>
    </html>
  );
}
