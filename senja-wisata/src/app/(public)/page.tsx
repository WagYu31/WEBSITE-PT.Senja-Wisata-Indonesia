import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import PopularTours from "@/components/home/PopularTours";
import DestinationsSection from "@/components/home/DestinationsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PromoBanner from "@/components/home/PromoBanner";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
    title: "PT. Senja Wisata Indonesia — Liburan Impian Anda",
};

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <StatsBar />
            <PopularTours />
            <DestinationsSection />
            <WhyChooseUs />
            <TestimonialsSection />
            <PromoBanner />
            <NewsletterSection />
        </>
    );
}
