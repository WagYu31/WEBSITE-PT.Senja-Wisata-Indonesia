import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import { tours } from "@/lib/data";

export default function PopularTours() {
    const popularTours = tours.slice(0, 6);

    return (
        <section className="section bg-slate-50">
            <div className="container">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                    <div>
                        <span className="section-label">Pilihan Terbaik</span>
                        <h2 className="section-title">Paket Wisata Terpopuler</h2>
                        <p className="section-desc">Ribuan traveler telah mempercayakan perjalanan impian mereka kepada kami</p>
                    </div>
                    <Link href="/tours" className="btn btn-outline shrink-0 gap-2">
                        Lihat Semua <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularTours.map((tour, i) => (
                        <TourCard key={tour.id} tour={tour} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
