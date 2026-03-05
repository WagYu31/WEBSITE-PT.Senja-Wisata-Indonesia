module.exports = [
"[project]/src/lib/data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categories",
    ()=>categories,
    "destinations",
    ()=>destinations,
    "stats",
    ()=>stats,
    "testimonials",
    ()=>testimonials,
    "tours",
    ()=>tours
]);
const tours = [
    {
        id: 1,
        slug: "raja-ampat-paradise",
        title: "Raja Ampat Paradise",
        location: "Papua Barat, Indonesia",
        duration: "7 Days",
        rating: 4.9,
        reviews: 128,
        price: 8500000,
        originalPrice: 10000000,
        image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
            "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&q=80",
            "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80"
        ],
        category: "Beach",
        badge: "Terpopuler",
        includes: [
            "Hotel",
            "Semua Makan",
            "Guide",
            "Snorkeling",
            "Speedboat"
        ],
        maxPax: 12,
        minAge: 8,
        description: "Nikmati keindahan Raja Ampat yang luar biasa dalam paket wisata komprehensif ini. Jelajahi pulau-pulau tropis eksotis, selami lautan biru jernih penuh terumbu karang, dan rasakan keramahan warga lokal.",
        itinerary: [
            {
                day: 1,
                title: "Tiba di Sorong & Transfer",
                description: "Disambut guide kami di Bandara Domine Eduard Osok, transfer ke resort di Raja Ampat."
            },
            {
                day: 2,
                title: "Snorkeling Chicken Island",
                description: "Menikmati keindahan terumbu karang berwarna-warni dan ikan-ikan tropis."
            },
            {
                day: 3,
                title: "Pianemo & Friwen Wall Diving",
                description: "Sunrise di Pianemo, diving di Friwen Wall, BBQ malam hari di tepi pantai."
            },
            {
                day: 4,
                title: "Cape Kri & Manta Sandy",
                description: "Berenang bersama manta ray, snorkeling di Cape Kri."
            },
            {
                day: 5,
                title: "Wayag Lagoon",
                description: "Full day trip ke Wayag, trekking ke puncak untuk foto ikonik."
            },
            {
                day: 6,
                title: "Free Program & Sunset Cruise",
                description: "Aktivitas pilihan: kayak, snorkeling, atau relaxasi. Sunset cruise sore hari."
            },
            {
                day: 7,
                title: "Check-out & Pulang",
                description: "Sarapan, packing, transfer ke Sorong, penerbangan pulang."
            }
        ],
        island: "Papua"
    },
    {
        id: 2,
        slug: "bali-complete-experience",
        title: "Bali Complete Experience",
        location: "Bali, Indonesia",
        duration: "5 Days",
        rating: 4.8,
        reviews: 215,
        price: 5200000,
        originalPrice: 6500000,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80"
        ],
        category: "Culture",
        badge: "Hot Deal",
        includes: [
            "Villa Private",
            "Semua Makan",
            "Guide",
            "Transport",
            "Spa"
        ],
        maxPax: 20,
        minAge: 0,
        description: "Paket lengkap menikmati Bali dari budaya hingga alam. Villa private, pura-pura ikonik, sawah Tegalalang, dan sunset Uluwatu.",
        itinerary: [
            {
                day: 1,
                title: "Tiba di Bali & Check-in Villa",
                description: "Transfer ke villa, welcome dinner dengan pemandangan sawah."
            },
            {
                day: 2,
                title: "Ubud Cultural Tour",
                description: "Tegalalang Rice Terrace, Monkey Forest, Tirta Empul."
            },
            {
                day: 3,
                title: "Spiritual Bali",
                description: "Pura Besakih, Kintamani, Danau Batur, Penelokan."
            },
            {
                day: 4,
                title: "Nusa Penida Day Trip",
                description: "Kelingking Beach, Angel Billabong, Crystal Bay snorkeling."
            },
            {
                day: 5,
                title: "Free & Departing",
                description: "Shopping di Seminyak, sunset Uluwatu, transfer bandara."
            }
        ],
        island: "Bali"
    },
    {
        id: 3,
        slug: "bromo-sunrise-trekking",
        title: "Bromo Sunrise Trekking",
        location: "Jawa Timur, Indonesia",
        duration: "2 Days",
        rating: 4.7,
        reviews: 189,
        price: 1800000,
        image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80"
        ],
        category: "Adventure",
        badge: "Popular",
        includes: [
            "Hotel",
            "Sarapan",
            "Guide",
            "Jeep 4WD",
            "Masker"
        ],
        maxPax: 8,
        minAge: 10,
        description: "Saksikan sunrise spektakuler dari puncak kaldera Bromo. Trekking di lautan pasir, foto ikonik, pengalaman yang tak terlupakan.",
        itinerary: [
            {
                day: 1,
                title: "Malang/Surabaya → Cemoro Lawang",
                description: "Perjalanan sore hari, check-in hotel, persiapan sunrise."
            },
            {
                day: 2,
                title: "Sunrise & Bromo Crater",
                description: "Bangun 03:00, jeep ke Penanjakan, sunrise view, turun ke kawah Bromo."
            }
        ],
        island: "Jawa"
    },
    {
        id: 4,
        slug: "yogyakarta-cultural",
        title: "Yogyakarta Cultural Tour",
        location: "DIY Yogyakarta, Indonesia",
        duration: "3 Days",
        rating: 4.6,
        reviews: 97,
        price: 2400000,
        image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=800&q=80"
        ],
        category: "Culture",
        badge: "",
        includes: [
            "Hotel",
            "Makan",
            "Guide",
            "Transport",
            "Tiket Masuk"
        ],
        maxPax: 15,
        minAge: 0,
        description: "Jelajahi Yogyakarta: Borobudur megah, Prambanan agung, Kraton, Malioboro, dan petualangan Merapi.",
        itinerary: [
            {
                day: 1,
                title: "Tiba & Malioboro",
                description: "Check-in, sore jalan-jalan Malioboro, makan gudeg."
            },
            {
                day: 2,
                title: "Borobudur & Prambanan",
                description: "Sunrise Borobudur, siang Prambanan, sore Kraton."
            },
            {
                day: 3,
                title: "Merapi Lava Tour",
                description: "Jeep Merapi lava tour pagi, siang check-out."
            }
        ],
        island: "Jawa"
    },
    {
        id: 5,
        slug: "komodo-island-adventure",
        title: "Komodo Island Adventure",
        location: "NTT, Indonesia",
        duration: "4 Days",
        rating: 4.8,
        reviews: 64,
        price: 7200000,
        image: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=800&q=80"
        ],
        category: "Adventure",
        badge: "New",
        includes: [
            "Liveaboard",
            "Semua Makan",
            "Dive/Snorkel",
            "Guide",
            "Tiket NP"
        ],
        maxPax: 10,
        minAge: 12,
        description: "Petualangan melihat Komodo dragon langsung di habitat aslinya, snorkeling di Pink Beach yang memukau, dan diving kelas dunia.",
        itinerary: [
            {
                day: 1,
                title: "Labuan Bajo & Boarding",
                description: "Tiba Labuan Bajo, boarding liveaboard, sunset cruise."
            },
            {
                day: 2,
                title: "Komodo & Rinca Island",
                description: "Trekking lihat komodo, snorkeling Manta Point."
            },
            {
                day: 3,
                title: "Pink Beach & Padar",
                description: "Pink Beach snorkeling, trekking Padar Island sunrise."
            },
            {
                day: 4,
                title: "Kanawa & Kembali",
                description: "Snorkeling Kanawa Island, kembali ke Labuan Bajo."
            }
        ],
        island: "NTT"
    },
    {
        id: 6,
        slug: "lombok-gili-islands",
        title: "Lombok & Gili Islands",
        location: "NTB, Indonesia",
        duration: "5 Days",
        rating: 4.7,
        reviews: 112,
        price: 4800000,
        image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80"
        ],
        category: "Beach",
        badge: "Hot Deal",
        includes: [
            "Hotel",
            "Semua Makan",
            "Fast Boat",
            "Snorkeling",
            "Guide"
        ],
        maxPax: 15,
        minAge: 5,
        description: "Lombok dan Gili Islands — perpaduan sempurna pantai pasir putih, snorkeling, dan budaya Sasak yang autentik.",
        itinerary: [
            {
                day: 1,
                title: "Tiba Lombok & Mandalika",
                description: "Check-in resort Mandalika, pantai Kuta Lombok."
            },
            {
                day: 2,
                title: "Gili Trawangan",
                description: "Fast boat ke Gili T, snorkeling, sunset swing."
            },
            {
                day: 3,
                title: "Gili Meno & Air",
                description: "Hopping 3 Gili, snorkeling bersama penyu."
            },
            {
                day: 4,
                title: "Rinjani Foothill",
                description: "Trekking ringan ke air terjun Sendang Gile."
            },
            {
                day: 5,
                title: "Sasak Village & Pulang",
                description: "Desa Sade, tenun tradisional, transfer bandara."
            }
        ],
        island: "NTB"
    },
    // ====== FAMILY ======
    {
        id: 11,
        slug: "bali-family-adventure",
        title: "Bali Family Adventure",
        location: "Bali, Indonesia",
        duration: "5 Hari 4 Malam",
        rating: 4.8,
        reviews: 93,
        price: 6500000,
        originalPrice: 8000000,
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&q=80"
        ],
        category: "Family",
        badge: "Family Friendly",
        includes: [
            "Villa Family",
            "Semua Makan",
            "Guide",
            "Water Park",
            "Transport"
        ],
        maxPax: 25,
        minAge: 0,
        description: "Paket wisata keluarga terbaik di Bali! Water park Waterbom, Bali Safari & Marine Park, wahana atraksi anak, dan villa keluarga nyaman dengan kolam renang private.",
        itinerary: [
            {
                day: 1,
                title: "Tiba & Waterbom Bali",
                description: "Check-in villa, sore main di Waterbom Bali — waterslide seru untuk semua umur."
            },
            {
                day: 2,
                title: "Bali Safari & Marine Park",
                description: "Exploring satwa liar, pertunjukan animal show, dan tram safari menegangkan."
            },
            {
                day: 3,
                title: "Ubud Family Tour",
                description: "Monkey Forest, Tegalalang Rice Terrace, museum Elephant, makan siang di tepi sawah."
            },
            {
                day: 4,
                title: "Pantai & Dolphin Watching",
                description: "Lovina Beach dolphin watching dini hari, sore main di Seminyak Beach."
            },
            {
                day: 5,
                title: "Souvenir & Pulang",
                description: "Belanja oleh-oleh Krisna, santap seafood terakhir, transfer bandara."
            }
        ],
        island: "Bali"
    },
    {
        id: 12,
        slug: "jogja-family-discovery",
        title: "Jogja Family Discovery",
        location: "DIY Yogyakarta, Indonesia",
        duration: "4 Hari 3 Malam",
        rating: 4.7,
        reviews: 76,
        price: 3200000,
        image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80"
        ],
        category: "Family",
        badge: "Best Value",
        includes: [
            "Hotel Keluarga",
            "Sarapan",
            "Guide",
            "Tiket Masuk",
            "Transport"
        ],
        maxPax: 20,
        minAge: 0,
        description: "Liburan keluarga edukatif di Yogyakarta! Borobudur megah, planetarium, museum anak, naik andong Malioboro, dan workshop batik yang seru untuk si kecil.",
        itinerary: [
            {
                day: 1,
                title: "Tiba & Malioboro",
                description: "Check-in hotel, sore jalan-jalan Malioboro, naik andong, makan gudeg."
            },
            {
                day: 2,
                title: "Borobudur & Workshop Batik",
                description: "Sunrise Borobudur, workshop batik di Desa Wukirsari, siang Prambanan."
            },
            {
                day: 3,
                title: "Merapi Jeep & Museum",
                description: "Jeep lava tour Merapi, Museum Gunung Merapi, sore Kraton Yogyakarta."
            },
            {
                day: 4,
                title: "Pusat Oleh-oleh & Pulang",
                description: "Kunjungan pabrik bakpia, Pasar Beringharjo, transfer stasiun/bandara."
            }
        ],
        island: "Jawa"
    },
    // ====== HONEYMOON ======
    {
        id: 13,
        slug: "maldives-honeymoon-escape",
        title: "Maldives Honeymoon Escape",
        location: "Maafushi, Maladewa",
        duration: "6 Hari 5 Malam",
        rating: 5.0,
        reviews: 38,
        price: 32000000,
        originalPrice: 38000000,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
        ],
        category: "Honeymoon",
        badge: "Luxury",
        includes: [
            "Water Villa",
            "Semua Makan",
            "Snorkeling",
            "Sunset Cruise",
            "Spa Pasangan"
        ],
        maxPax: 2,
        minAge: 18,
        description: "Liburan bulan madu impian di Maladewa — bungalow di atas air, air sebiru kristal, sunset dinner romantis, dan spa eksklusif untuk berdua. Pengalaman sekali seumur hidup.",
        itinerary: [
            {
                day: 1,
                title: "Tiba & Check-in Water Villa",
                description: "Speed boat dari Malé ke resort, sunset welcome dinner di dermaga private."
            },
            {
                day: 2,
                title: "Snorkeling & Dolphin Cruise",
                description: "Snorkeling bersama penyu, dolphin cruise sore hari, candle dinner di pantai."
            },
            {
                day: 3,
                title: "Spa & Privat Beach",
                description: "Couples spa treatment pagi, siang santai di private beach, bbq dinner."
            },
            {
                day: 4,
                title: "Island Hopping",
                description: "Kunjungi pulau lokal Maladewa, pasar tradisional, makan seafood segar."
            },
            {
                day: 5,
                title: "Sunrise Kayak & Relaksasi",
                description: "Kayak sambil sunrise, free program, makan malam fine dining over water."
            },
            {
                day: 6,
                title: "Pulang",
                description: "Sarapan, check-out, speed boat ke Malé, penerbangan kembali."
            }
        ],
        island: "Maladewa"
    },
    {
        id: 14,
        slug: "bali-honeymoon-bliss",
        title: "Bali Honeymoon Bliss",
        location: "Ubud & Seminyak, Bali",
        duration: "5 Hari 4 Malam",
        rating: 4.9,
        reviews: 61,
        price: 8900000,
        originalPrice: 11000000,
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80"
        ],
        category: "Honeymoon",
        badge: "Romantic",
        includes: [
            "Villa Private Pool",
            "Sarapan Romantis",
            "Flower Bath",
            "Sunset Cruise",
            "Spa"
        ],
        maxPax: 2,
        minAge: 18,
        description: "Bulan madu sempurna di Bali — villa private pool di Ubud dengan pemandangan sawah, romantic flower bath, sunset di Tanah Lot, dan fine dining tepi pantai Seminyak.",
        itinerary: [
            {
                day: 1,
                title: "Tiba & Villa Ubud",
                description: "Check-in villa private pool, flower bath surprise, candlelight dinner di villa."
            },
            {
                day: 2,
                title: "Ubud Romantic Tour",
                description: "Tegalalang Rice Terrace, Tirta Empul blessing, couples spa treatment."
            },
            {
                day: 3,
                title: "Tanah Lot & Seminyak",
                description: "Sunset Tanah Lot paling romantis, pindah ke boutique hotel Seminyak."
            },
            {
                day: 4,
                title: "Nusa Penida Private Boat",
                description: "Private speedboat ke Kelingking Beach, Crystal Bay snorkeling berdua."
            },
            {
                day: 5,
                title: "Free & Pulang",
                description: "Sarapan romantic, shopping terakhir, transfer bandara."
            }
        ],
        island: "Bali"
    },
    {
        id: 7,
        slug: "malaysia-kuala-lumpur-escape",
        title: "Malaysia Kuala Lumpur Escape",
        location: "Kuala Lumpur, Malaysia",
        duration: "4 Hari 3 Malam",
        rating: 4.7,
        reviews: 84,
        price: 6900000,
        originalPrice: 8500000,
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
            "https://images.unsplash.com/photo-1567339405868-4b8a3459f040?w=800&q=80"
        ],
        category: "International",
        badge: "Bestseller",
        includes: [
            "Hotel Bintang 4",
            "Sarapan",
            "Guide",
            "Transport",
            "Tiket Petronas"
        ],
        maxPax: 20,
        minAge: 0,
        description: "Jelajahi ibu kota Malaysia yang modern dan kosmopolitan. Petronas Twin Towers, Batu Caves, Bukit Bintang, dan kuliner halal terbaik Asia Tenggara.",
        itinerary: [
            {
                day: 1,
                title: "Tiba KL & Check-in",
                description: "Jemput bandara KLIA, check-in hotel bintang 4, makan malam di Jalan Alor."
            },
            {
                day: 2,
                title: "Petronas & City Tour",
                description: "KLCC Park, naik Petronas Twin Towers sky bridge, Suria KLCC, Aquarium KLCC."
            },
            {
                day: 3,
                title: "Batu Caves & Bukit Bintang",
                description: "Batu Caves pagi hari, siang shopping Pavilion, Bukit Bintang malam."
            },
            {
                day: 4,
                title: "Genting & Pulang",
                description: "Cable car Genting Highlands, makan siang, transfer bandara."
            }
        ],
        island: "Malaysia"
    },
    {
        id: 8,
        slug: "thailand-bangkok-phuket",
        title: "Thailand Bangkok & Phuket",
        location: "Bangkok & Phuket, Thailand",
        duration: "6 Hari 5 Malam",
        rating: 4.8,
        reviews: 142,
        price: 11500000,
        originalPrice: 14000000,
        image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
        ],
        category: "International",
        badge: "Hot Deal",
        includes: [
            "Hotel",
            "Sarapan",
            "Guide",
            "Transfer",
            "Island Hopping"
        ],
        maxPax: 16,
        minAge: 0,
        description: "Kombinasi terbaik Bangkok yang megah dan Phuket yang tropis. Temple, floating market, Phi Phi Islands, dan sunset di Patong Beach.",
        itinerary: [
            {
                day: 1,
                title: "Tiba Bangkok",
                description: "Transfer hotel, Khao San Road, makan pad thai tepi sungai."
            },
            {
                day: 2,
                title: "Grand Palace & Temple",
                description: "Wat Pho, Grand Palace, Wat Arun, cruise Chao Phraya river."
            },
            {
                day: 3,
                title: "Floating Market & Fly ke Phuket",
                description: "Amphawa Floating Market pagi, siang terbang ke Phuket."
            },
            {
                day: 4,
                title: "Phi Phi Islands",
                description: "Speedboat tour ke Phi Phi, Maya Bay, snorkeling lagoon biru."
            },
            {
                day: 5,
                title: "Phang Nga Bay",
                description: "James Bond Island, kayak gua, Patong Beach sunset."
            },
            {
                day: 6,
                title: "Phuket Town & Pulang",
                description: "Old Town Phuket, oleh-oleh, transfer bandara."
            }
        ],
        island: "Thailand"
    },
    {
        id: 9,
        slug: "jepang-tokyo-osaka",
        title: "Jepang Tokyo & Osaka",
        location: "Tokyo & Osaka, Jepang",
        duration: "9 Hari 8 Malam",
        rating: 4.9,
        reviews: 67,
        price: 24500000,
        originalPrice: 29000000,
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
        ],
        category: "International",
        badge: "Premium",
        includes: [
            "Hotel Bintang 4",
            "Semua Makan",
            "JR Pass",
            "Guide Berbahasa Indonesia",
            "Tiket Fuji"
        ],
        maxPax: 15,
        minAge: 5,
        description: "Petualangan impian ke Jepang — Tokyo yang futuristik, Kyoto yang klasik, dan Osaka yang meriah. Fuji-san, Disneyland, Dotonbori, dan sakura.",
        itinerary: [
            {
                day: 1,
                title: "Tiba Tokyo & Asakusa",
                description: "Tiba Narita/Haneda, Senso-ji Temple, Nakamise Shopping Street."
            },
            {
                day: 2,
                title: "Tokyo Disneyland",
                description: "Full day di Tokyo Disneyland, malam Akihabara Electric Town."
            },
            {
                day: 3,
                title: "Harajuku & Shibuya",
                description: "Meiji Shrine, Harajuku Takeshita, Shibuya Crossing, Shinjuku."
            },
            {
                day: 4,
                title: "Mount Fuji & Hakone",
                description: "Fuji 5th station, Lac Kawaguchi, Hakone onsen."
            },
            {
                day: 5,
                title: "Kyoto - Fushimi Inari",
                description: "Shinkansen ke Kyoto, Fushimi Inari, Kinkaku-ji (Golden Pavilion)."
            },
            {
                day: 6,
                title: "Kyoto - Arashiyama",
                description: "Bamboo Grove, Nishiki Market, Gion district malam."
            },
            {
                day: 7,
                title: "Nara & Osaka",
                description: "Todai-ji, rusa Nara, pindah Osaka, Dotonbori."
            },
            {
                day: 8,
                title: "Osaka Castle & USJ",
                description: "Osaka Castle pagi, Universal Studios Japan siang-malam."
            },
            {
                day: 9,
                title: "Pulang",
                description: "Sarapan, oleh-oleh terakhir, transfer Kansai Airport."
            }
        ],
        island: "Jepang"
    },
    {
        id: 10,
        slug: "turki-istanbul-cappadocia",
        title: "Turki Istanbul & Cappadocia",
        location: "Istanbul & Cappadocia, Turki",
        duration: "8 Hari 7 Malam",
        rating: 4.9,
        reviews: 43,
        price: 21000000,
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80"
        ],
        category: "International",
        badge: "Terpopuler",
        includes: [
            "Hotel Butik",
            "Sarapan",
            "Guide",
            "Balon Udara",
            "Turkish Night"
        ],
        maxPax: 15,
        minAge: 8,
        description: "Wisata halal ke Turki yang memukau — Hagia Sophia, Grand Bazaar Istanbul, naik balon udara di Cappadocia, dan menikmati kuliner Turki otentik.",
        itinerary: [
            {
                day: 1,
                title: "Tiba Istanbul",
                description: "Transfer hotel, Galata Bridge, makan malam restoran halal tepi Bosphorus."
            },
            {
                day: 2,
                title: "Old Istanbul",
                description: "Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar."
            },
            {
                day: 3,
                title: "Bosphorus & Modern Istanbul",
                description: "Bosphorus cruise, Dolmabahce Palace, Istiklal Street."
            },
            {
                day: 4,
                title: "Istanbul - Cappadocia",
                description: "Terbang ke Cappadocia, Goreme Open-Air Museum, Sunset Valley."
            },
            {
                day: 5,
                title: "Balon Udara & Underground City",
                description: "Naik balon udara saat sunrise, Derinkuyu Underground City."
            },
            {
                day: 6,
                title: "Cappadocia Exploration",
                description: "Rose Valley hike, Uchisar Castle, pottery workshop di Avanos."
            },
            {
                day: 7,
                title: "Pamukkale",
                description: "Cotton Castle thermal pools, Hierapolis ruins, Turkish Night dinner."
            },
            {
                day: 8,
                title: "Pulang",
                description: "Transfer bandara Ankara/Istanbul, penerbangan kembali ke Indonesia."
            }
        ],
        island: "Turki"
    }
];
const destinations = [
    {
        id: 1,
        name: "Bali",
        country: "Indonesia",
        island: "Bali",
        tours: 48,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
        description: "Pulau Dewata dengan budaya unik dan alam memukau"
    },
    {
        id: 2,
        name: "Raja Ampat",
        country: "Papua Barat, Indonesia",
        island: "Papua",
        tours: 15,
        image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80",
        description: "Keajaiban bawah laut terbaik dunia"
    },
    {
        id: 3,
        name: "Yogyakarta",
        country: "Java, Indonesia",
        island: "Jawa",
        tours: 32,
        image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=600&q=80",
        description: "Pusat kebudayaan Jawa dengan warisan UNESCO"
    },
    {
        id: 4,
        name: "Komodo",
        country: "NTT, Indonesia",
        island: "NTT",
        tours: 12,
        image: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=600&q=80",
        description: "Rumah naga Komodo dan perairan kristal"
    },
    {
        id: 5,
        name: "Labuan Bajo",
        country: "NTT, Indonesia",
        island: "NTT",
        tours: 18,
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=600&q=80",
        description: "Gerbang menuju kepulauan Komodo yang eksotis"
    },
    {
        id: 6,
        name: "Mount Bromo",
        country: "Jawa Timur, Indonesia",
        island: "Jawa",
        tours: 25,
        image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=600&q=80",
        description: "Gunung api aktif dengan sunrise spektakuler"
    }
];
const testimonials = [
    {
        id: 1,
        name: "Ahmad Rasyid",
        from: "Makassar",
        rating: 5,
        text: "Pengalaman yang luar biasa! Raja Ampat benar-benar surga tersembunyi Indonesia. Pelayanan Senja Wisata top banget.",
        tour: "Raja Ampat Paradise",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
        id: 2,
        name: "Sari Dewi",
        from: "Surabaya",
        rating: 5,
        text: "Worth every penny! Tim guide sangat profesional dan pengalaman snorkeling di sana tidak ada bandingannya. Pasti balik lagi!",
        tour: "Bali Complete Experience",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
        id: 3,
        name: "Doni Kurniawan",
        from: "Bandung",
        rating: 4,
        text: "Sangat puas dengan pelayanannya. Guide sangat cekatan mengatur itinerary alternatif saat cuaca kurang mendukung.",
        tour: "Bromo Sunrise Trekking",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg"
    }
];
const stats = [
    {
        value: 120,
        suffix: "+",
        label: "Destinasi"
    },
    {
        value: 500,
        suffix: "+",
        label: "Paket Wisata"
    },
    {
        value: 15000,
        suffix: "+",
        label: "Happy Travelers"
    },
    {
        value: 4.9,
        suffix: "★",
        label: "Rating Rata-rata",
        decimal: true
    }
];
const categories = [
    {
        id: "beach",
        label: "🏖️ Pantai",
        icon: "🏖️"
    },
    {
        id: "culture",
        label: "🏛️ Budaya",
        icon: "🏛️"
    },
    {
        id: "adventure",
        label: "🧗 Petualangan",
        icon: "🧗"
    },
    {
        id: "family",
        label: "👨‍👩‍👧 Keluarga",
        icon: "👨‍👩‍👧"
    },
    {
        id: "honeymoon",
        label: "💑 Honeymoon",
        icon: "💑"
    },
    {
        id: "international",
        label: "✈️ Luar Negeri",
        icon: "✈️"
    }
];
}),
"[project]/src/app/(public)/destinations/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DestinationsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const islands = [
    "Semua",
    "Bali",
    "Jawa",
    "Papua",
    "NTT",
    "NTB",
    "Sumatra",
    "Kalimantan",
    "Sulawesi"
];
const whyItems = [
    {
        icon: "🏝️",
        title: "17.000+ Pulau",
        desc: "Indonesia memiliki lebih dari 17.000 pulau yang menakjubkan, dari Sabang sampai Merauke."
    },
    {
        icon: "🌊",
        title: "Biodiversitas Laut",
        desc: "Segitiga Terumbu Karang dunia berada di Indonesia, dengan ribuan spesies laut yang unik."
    },
    {
        icon: "🏛️",
        title: "Warisan Dunia",
        desc: "8 situs UNESCO World Heritage, dari Borobudur hingga hutan hujan tropis Sumatera."
    },
    {
        icon: "🍜",
        title: "Kuliner Nusantara",
        desc: "Kekayaan masakan dari ratusan suku dengan cita rasa yang tak tertandingi di dunia."
    }
];
function DestinationsPage() {
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [island, setIsland] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Semua");
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["destinations"].filter((d)=>{
            const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase());
            const matchIsland = island === "Semua" || d.island === island;
            return matchSearch && matchIsland;
        });
    }, [
        search,
        island
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "gradient-primary py-20 px-4 relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-1/4 w-96 h-96 bg-blue/20 rounded-full blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                lineNumber: 36,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                lineNumber: 37,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                        lineNumber: 35,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto max-w-4xl relative text-center text-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                            lineNumber: 42,
                                            columnNumber: 29
                                        }, this),
                                        " Explore Nusantara"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 41,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-5xl font-bold mb-4 text-white",
                                    children: [
                                        "Destinasi ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-accent",
                                            children: "Wisata Indonesia"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                            lineNumber: 45,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/70 text-lg max-w-2xl mx-auto mb-8",
                                    children: "Jelajahi keindahan 17.000 pulau Indonesia, dari sabang di ujung barat hingga merauke di ujung timur."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative max-w-xl mx-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            size: 18,
                                            className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                            lineNumber: 53,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Cari destinasi...",
                                            value: search,
                                            onChange: (e)=>setSearch(e.target.value),
                                            className: "w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-primary placeholder:text-slate-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue/30 text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                            lineNumber: 54,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto max-w-6xl px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 overflow-x-auto py-3 scrollbar-hide",
                        children: islands.map((isl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsland(isl),
                                className: `shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${island === isl ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
                                children: isl
                            }, isl, false, {
                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                lineNumber: 71,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                        lineNumber: 69,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                    lineNumber: 68,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto max-w-6xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-primary",
                                        children: island === "Semua" ? "Semua Destinasi" : `Destinasi ${island}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500 text-sm mt-1",
                                        children: [
                                            filtered.length,
                                            " destinasi ditemukan"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                lineNumber: 88,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                            lineNumber: 87,
                            columnNumber: 21
                        }, this),
                        filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-20 text-slate-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                    size: 48,
                                    className: "mx-auto mb-4 opacity-30"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 98,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-semibold",
                                    children: "Destinasi tidak ditemukan"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mt-1",
                                    children: "Coba kata kunci lain"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                            lineNumber: 97,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: filtered.map((dest, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: i * 0.05
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/tours?island=${dest.island}`,
                                        className: "group card overflow-hidden block hover:-translate-y-1 transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative h-52 overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: dest.image,
                                                        alt: dest.name,
                                                        className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-4 left-4 text-white",
                                                        style: {
                                                            textShadow: "0 2px 8px rgba(0,0,0,0.7)"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xl font-bold text-white",
                                                                children: dest.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                                lineNumber: 123,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1 text-white/90 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                                        lineNumber: 125,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    " ",
                                                                    dest.country
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                                lineNumber: 124,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-4 right-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30",
                                                            children: dest.island
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                            lineNumber: 129,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-sm mb-3",
                                                        children: dest.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1 text-sm text-blue-700 font-semibold",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                                        lineNumber: 138,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    " ",
                                                                    dest.tours,
                                                                    " paket tersedia"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                                lineNumber: 137,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-accent text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all",
                                                                children: [
                                                                    "Lihat Tour ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                                        lineNumber: 141,
                                                                        columnNumber: 64
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                                lineNumber: 140,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 37
                                    }, this)
                                }, dest.id, false, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                            lineNumber: 103,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                    lineNumber: 86,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 bg-slate-50 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto max-w-6xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-primary mb-3",
                                    children: "Mengapa Indonesia?"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 157,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-500 max-w-xl mx-auto",
                                    children: "Indonesia adalah salah satu destinasi wisata terkaya di dunia dengan keanekaragaman alam dan budaya yang luar biasa."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 158,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                            lineNumber: 156,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: whyItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        delay: i * 0.1
                                    },
                                    className: "card p-6 text-center hover:-translate-y-1 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl mb-4",
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-primary mb-2",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-500 text-sm",
                                            children: item.desc
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, item.title, true, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/destinations/page.tsx",
                            lineNumber: 162,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                    lineNumber: 155,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                lineNumber: 154,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto max-w-4xl text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gradient-primary rounded-3xl p-12 text-white relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                lineNumber: 185,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold mb-3 text-white",
                                        children: "Siap Menjelajahi Indonesia?"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/70 mb-8 max-w-lg mx-auto",
                                        children: "Temukan paket wisata terbaik yang sesuai dengan impian dan budget Anda."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                        lineNumber: 190,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/tours",
                                        className: "btn bg-white text-primary hover:bg-white/90 text-base px-8 py-3.5 font-bold",
                                        children: "Lihat Semua Paket Wisata"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                                lineNumber: 188,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(public)/destinations/page.tsx",
                        lineNumber: 184,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(public)/destinations/page.tsx",
                    lineNumber: 183,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(public)/destinations/page.tsx",
                lineNumber: 182,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(public)/destinations/page.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Search
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21 21-4.34-4.34",
            key: "14j7rj"
        }
    ],
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ]
];
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("search", __iconNode);
;
 //# sourceMappingURL=search.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MapPin
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }
    ]
];
const MapPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("map-pin", __iconNode);
;
 //# sourceMappingURL=map-pin.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Package
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
            key: "1a0edw"
        }
    ],
    [
        "path",
        {
            d: "M12 22V12",
            key: "d0xqtd"
        }
    ],
    [
        "polyline",
        {
            points: "3.29 7 12 12 20.71 7",
            key: "ousv84"
        }
    ],
    [
        "path",
        {
            d: "m7.5 4.27 9 5.15",
            key: "1c824w"
        }
    ]
];
const Package = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("package", __iconNode);
;
 //# sourceMappingURL=package.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Package",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Globe
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
            key: "13o1zl"
        }
    ],
    [
        "path",
        {
            d: "M2 12h20",
            key: "9i4pu4"
        }
    ]
];
const Globe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("globe", __iconNode);
;
 //# sourceMappingURL=globe.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Globe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_38171cb9._.js.map