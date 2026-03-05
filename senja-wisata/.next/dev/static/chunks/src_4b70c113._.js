(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(public)/tours/[slug]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TourDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const tabs = [
    "Overview",
    "Itinerary",
    "Termasuk",
    "Ulasan"
];
function TourDetailPage({ params }) {
    _s();
    const { slug } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const tour = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tours"].find((t)=>t.slug === slug);
    if (!tour) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notFound"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Overview");
    const [activeImg, setActiveImg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [adults, setAdults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2);
    const [children, setChildren] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isBooking, setIsBooking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bookingError, setBookingError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showPassengerForm, setShowPassengerForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [passengers, setPassengers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [contactPhone, setContactPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formErrors, setFormErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const total = tour.price * (adults + children * 0.5);
    const openPassengerForm = ()=>{
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }
        if (!date) {
            setBookingError("Pilih tanggal berangkat terlebih dahulu");
            return;
        }
        setBookingError("");
        // Initialize passengers array
        const pax = [];
        for(let i = 0; i < adults; i++)pax.push({
            name: "",
            idNumber: "",
            birthDate: "",
            type: "adult"
        });
        for(let i = 0; i < children; i++)pax.push({
            name: "",
            idNumber: "",
            birthDate: "",
            type: "child"
        });
        setPassengers(pax);
        setContactPhone("");
        setFormErrors([]);
        setShowPassengerForm(true);
    };
    const validatePassengerForm = ()=>{
        const errors = [];
        passengers.forEach((p, i)=>{
            if (!p.name.trim()) errors.push(`Nama peserta ${i + 1} wajib diisi`);
            if (!p.idNumber.trim()) errors.push(`No. KTP/Paspor peserta ${i + 1} wajib diisi`);
            if (!p.birthDate) errors.push(`Tanggal lahir peserta ${i + 1} wajib diisi`);
        });
        if (!contactPhone.trim()) errors.push("No. HP pemesan wajib diisi");
        setFormErrors(errors);
        return errors.length === 0;
    };
    const updatePassenger = (index, field, value)=>{
        setPassengers((prev)=>prev.map((p, i)=>i === index ? {
                    ...p,
                    [field]: value
                } : p));
    };
    const handleBook = async ()=>{
        if (!validatePassengerForm()) return;
        setShowPassengerForm(false);
        setIsBooking(true);
        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tourId: tour.id,
                    tourDate: date,
                    adults,
                    children,
                    userId: user?.id,
                    userName: user?.name,
                    userEmail: user?.email,
                    contactPhone,
                    passengers
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setBookingError(data.error || "Gagal membuat booking");
                setIsBooking(false);
                return;
            }
            // Open Midtrans Snap popup
            if (window.snap && data.snapToken) {
                const orderId = data.orderId;
                window.snap.pay(data.snapToken, {
                    onSuccess: async ()=>{
                        // Confirm payment status immediately (webhook can't reach localhost in dev)
                        try {
                            await fetch("/api/booking/confirm", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    orderId
                                })
                            });
                        } catch  {}
                        router.push("/dashboard/trips?payment=success");
                    },
                    onPending: async (result)=>{
                        // Capture VA number from Midtrans result and save to store
                        try {
                            const vaNumbers = result.va_numbers;
                            const va = vaNumbers?.[0];
                            if (va) {
                                await fetch("/api/booking/va", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        orderId,
                                        vaNumber: va.va_number,
                                        vaBank: va.bank
                                    })
                                });
                            }
                        } catch  {}
                        router.push("/dashboard/trips?payment=pending");
                    },
                    onError: ()=>{
                        setBookingError("Pembayaran gagal. Silakan coba lagi.");
                        setIsBooking(false);
                    },
                    onClose: ()=>{
                        setIsBooking(false);
                    }
                });
            } else {
                // Fallback: redirect to Midtrans payment page
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    setBookingError("Midtrans Snap belum siap. Silakan muat ulang halaman.");
                    setIsBooking(false);
                }
            }
        } catch  {
            setBookingError("Terjadi kesalahan. Silakan coba lagi.");
            setIsBooking(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-[60vh] min-h-[400px] bg-primary",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: tour.gallery[activeImg] || tour.image,
                        alt: tour.title,
                        fill: true,
                        className: "object-cover opacity-70"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                        lineNumber: 175,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                        lineNumber: 176,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-6 left-0 right-0 container",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-white/70 text-sm mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/",
                                        className: "hover:text-white",
                                        children: "Home"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 25
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 75
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/tours",
                                        className: "hover:text-white",
                                        children: "Tours"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 25
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 81
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white",
                                        children: tour.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                lineNumber: 178,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 flex-wrap mb-2",
                                children: [
                                    tour.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "badge badge-accent",
                                        children: tour.badge
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 184,
                                        columnNumber: 40
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "badge bg-white/20 text-white",
                                        children: tour.category
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                lineNumber: 183,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl lg:text-5xl font-bold text-white mb-2",
                                children: tour.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                lineNumber: 187,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 text-white/80 text-sm flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 67
                                            }, this),
                                            " ",
                                            tour.location
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 67
                                            }, this),
                                            " ",
                                            tour.duration
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 190,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 191,
                                                columnNumber: 67
                                            }, this),
                                            " Max ",
                                            tour.maxPax,
                                            " pax"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                size: 14,
                                                className: "fill-amber-400 text-amber-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 192,
                                                columnNumber: 67
                                            }, this),
                                            " ",
                                            tour.rating,
                                            " (",
                                            tour.reviews,
                                            " ulasan)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 192,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                lineNumber: 188,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                        lineNumber: 177,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                lineNumber: 174,
                columnNumber: 13
            }, this),
            tour.gallery.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mt-4 flex gap-2",
                children: tour.gallery.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveImg(i),
                        className: `relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: img,
                            alt: "",
                            fill: true,
                            className: "object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                            lineNumber: 202,
                            columnNumber: 29
                        }, this)
                    }, i, false, {
                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                        lineNumber: 201,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                lineNumber: 199,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col lg:flex-row gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1 border-b border-slate-200 mb-6 overflow-x-auto",
                                    children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveTab(tab),
                                            className: `px-5 py-3 font-semibold text-sm whitespace-nowrap transition-all border-b-2 -mb-px ${activeTab === tab ? "text-accent border-accent" : "text-slate-400 border-transparent hover:text-primary"}`,
                                            children: tab
                                        }, tab, false, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 25
                                }, this),
                                activeTab === "Overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "prose prose-slate max-w-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-600 leading-relaxed text-base",
                                            children: tour.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6",
                                            children: [
                                                {
                                                    label: "Durasi",
                                                    val: tour.duration
                                                },
                                                {
                                                    label: "Max Peserta",
                                                    val: `${tour.maxPax} orang`
                                                },
                                                {
                                                    label: "Min. Usia",
                                                    val: `${tour.minAge} tahun`
                                                }
                                            ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-50 border border-slate-100 rounded-xl p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-slate-400 mb-1",
                                                            children: d.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 233,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-bold text-primary",
                                                            children: d.val
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 234,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, d.label, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 230,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 228,
                                    columnNumber: 29
                                }, this),
                                activeTab === "Itinerary" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative border-l-2 border-blue/20 ml-4 pl-6 flex flex-col gap-6",
                                    children: tour.itinerary.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -left-[33px] w-6 h-6 bg-blue rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-[10px]",
                                                    children: day.day
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "card p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-blue font-semibold mb-1",
                                                            children: [
                                                                "Hari ",
                                                                day.day
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 249,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-primary mb-1",
                                                            children: day.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 250,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-500 text-sm",
                                                            children: day.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, day.day, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 244,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 29
                                }, this),
                                activeTab === "Termasuk" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid sm:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold mb-3 text-primary",
                                                    children: "✅ Termasuk"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-2",
                                                    children: tour.includes.map((inc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-slate-600 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    size: 16,
                                                                    className: "text-emerald-500 shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                    lineNumber: 265,
                                                                    columnNumber: 49
                                                                }, this),
                                                                " ",
                                                                inc
                                                            ]
                                                        }, inc, true, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 45
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 260,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold mb-3 text-primary",
                                                    children: "❌ Tidak Termasuk"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-2",
                                                    children: [
                                                        "Penerbangan domestik",
                                                        "Asuransi perjalanan",
                                                        "Tips pemandu",
                                                        "Minuman tambahan",
                                                        "Pengeluaran pribadi"
                                                    ].map((ex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-slate-500 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                    size: 16,
                                                                    className: "text-slate-300 shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 49
                                                                }, this),
                                                                " ",
                                                                ex
                                                            ]
                                                        }, ex, true, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 45
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 29
                                }, this),
                                activeTab === "Ulasan" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        {
                                            name: "Ahmad R.",
                                            rating: 5,
                                            text: "Pengalaman luar biasa! Highly recommended.",
                                            date: "Jan 2025"
                                        },
                                        {
                                            name: "Sari D.",
                                            rating: 5,
                                            text: "Pelayanan sangat profesional dan ramah.",
                                            date: "Des 2024"
                                        }
                                    ].map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "card p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-2",
                                                    children: [
                                                        [
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5
                                                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                size: 13,
                                                                className: s <= r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                                                            }, s, false, {
                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 71
                                                            }, this)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-slate-400 ml-2",
                                                            children: r.date
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 290,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-600 text-sm italic",
                                                    children: [
                                                        '"',
                                                        r.text,
                                                        '"'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold text-primary mt-2",
                                                    children: [
                                                        "— ",
                                                        r.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 284,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                            lineNumber: 211,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "w-full lg:w-80 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card p-5 sticky top-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1 text-sm text-slate-400",
                                        children: "Mulai dari"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 29
                                    }, this),
                                    tour.originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "line-through text-slate-400 text-sm",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(tour.originalPrice)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 52
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-bold text-accent mb-1",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(tour.price)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-400 mb-5",
                                        children: "per orang"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 306,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "form-label",
                                                children: "Tanggal Berangkat"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 310,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                        size: 15,
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-blue"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: date,
                                                        onChange: (e)=>setDate(e.target.value),
                                                        className: "form-input pl-9 text-sm",
                                                        min: new Date().toISOString().split("T")[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 309,
                                        columnNumber: 29
                                    }, this),
                                    [
                                        [
                                            "Dewasa",
                                            adults,
                                            setAdults
                                        ],
                                        [
                                            "Anak (50%)",
                                            children,
                                            setChildren
                                        ]
                                    ].map(([label, count, setCount])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold text-sm text-primary",
                                                            children: label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-slate-400",
                                                            children: label === "Dewasa" ? "12+ tahun" : "< 12 tahun"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 322,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setCount(Math.max(label === "Dewasa" ? 1 : 0, count - 1)),
                                                            className: "w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                lineNumber: 326,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-6 text-center font-bold",
                                                            children: count
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setCount(count + 1),
                                                            className: "w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                lineNumber: 330,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 33
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-slate-100 pt-4 mb-4 text-sm space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-slate-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            adults,
                                                            " Dewasa × ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(tour.price)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(tour.price * adults)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 338,
                                                columnNumber: 33
                                            }, this),
                                            children > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-slate-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            children,
                                                            " Anak × ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(tour.price * 0.5)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(tour.price * children * 0.5)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between font-bold text-primary text-base border-t border-slate-100 pt-2 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 349,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-accent",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(total)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 348,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 337,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: openPassengerForm,
                                        disabled: isBooking,
                                        className: "btn btn-primary w-full text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                        children: isBooking ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    size: 18,
                                                    className: "animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 39
                                                }, this),
                                                " Memproses..."
                                            ]
                                        }, void 0, true) : "Pesan Sekarang"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 354,
                                        columnNumber: 29
                                    }, this),
                                    bookingError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-500 text-center mt-2 font-medium",
                                        children: bookingError
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400 text-center mt-2",
                                        children: "Tidak ada biaya tersembunyi"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                lineNumber: 302,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                            lineNumber: 301,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                    lineNumber: 209,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                lineNumber: 208,
                columnNumber: 13
            }, this),
            showPassengerForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4",
                style: {
                    backgroundColor: "rgba(0,0,0,0.6)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        scale: 0.95,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0
                    },
                    className: "bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-0 bg-white border-b border-slate-100 p-4 sm:p-5 flex items-center justify-between z-10 rounded-t-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-primary",
                                            children: "Data Peserta"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 382,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-400",
                                            children: [
                                                tour.title,
                                                " · ",
                                                date
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 383,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 381,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowPassengerForm(false),
                                    className: "p-1.5 hover:bg-slate-100 rounded-lg transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20,
                                        className: "text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 386,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                            lineNumber: 380,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 sm:p-5 space-y-5",
                            children: [
                                formErrors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-red-50 border border-red-100 rounded-xl p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold text-red-600 mb-1",
                                            children: "Mohon lengkapi data berikut:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 394,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "text-xs text-red-500 space-y-0.5",
                                            children: [
                                                formErrors.slice(0, 3).map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            e
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 79
                                                    }, this)),
                                                formErrors.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "...dan ",
                                                        formErrors.length - 3,
                                                        " lainnya"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 397,
                                                    columnNumber: 67
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 395,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 393,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-50 border border-blue-100 rounded-xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                    size: 14,
                                                    className: "text-blue-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-blue-700",
                                                    children: "Data Pemesan"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 404,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] font-semibold text-slate-500 mb-1 block",
                                                            children: "Nama"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: user?.name || "",
                                                            disabled: true,
                                                            className: "form-input text-sm bg-slate-50 opacity-70"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] font-semibold text-slate-500 mb-1 block",
                                                            children: "Email"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 414,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: user?.email || "",
                                                            disabled: true,
                                                            className: "form-input text-sm bg-slate-50 opacity-70"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 415,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 413,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "sm:col-span-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] font-semibold text-slate-500 mb-1 block",
                                                            children: "No. HP / WhatsApp *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 418,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "tel",
                                                            value: contactPhone,
                                                            onChange: (e)=>setContactPhone(e.target.value),
                                                            placeholder: "+62 812-xxxx-xxxx",
                                                            className: "form-input text-sm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 408,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 29
                                }, this),
                                passengers.map((pax, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-slate-100 rounded-xl p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${pax.type === "adult" ? "bg-primary" : "bg-blue"}`,
                                                        children: idx + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-bold text-primary",
                                                        children: [
                                                            "Peserta ",
                                                            idx + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-[10px] px-2 py-0.5 rounded-full font-semibold ${pax.type === "adult" ? "bg-primary/10 text-primary" : "bg-blue/10 text-blue"}`,
                                                        children: pax.type === "adult" ? "Dewasa" : "Anak"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[11px] font-semibold text-slate-500 mb-1 block",
                                                                children: "Nama Lengkap *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                        size: 14,
                                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                        lineNumber: 450,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        value: pax.name,
                                                                        onChange: (e)=>updatePassenger(idx, "name", e.target.value),
                                                                        placeholder: "Sesuai KTP/Paspor",
                                                                        className: "form-input pl-9 text-sm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                        lineNumber: 451,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-[11px] font-semibold text-slate-500 mb-1 block",
                                                                        children: "No. KTP / Paspor *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                        lineNumber: 462,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "relative",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                                                size: 14,
                                                                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                                lineNumber: 464,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                value: pax.idNumber,
                                                                                onChange: (e)=>updatePassenger(idx, "idNumber", e.target.value),
                                                                                placeholder: "3201xxxxxxxxxxxx",
                                                                                className: "form-input pl-9 text-sm"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                                lineNumber: 465,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                        lineNumber: 463,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                lineNumber: 461,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-[11px] font-semibold text-slate-500 mb-1 block",
                                                                        children: "Tanggal Lahir *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                        lineNumber: 475,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "relative",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                size: 14,
                                                                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                                lineNumber: 477,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "date",
                                                                                value: pax.birthDate,
                                                                                onChange: (e)=>updatePassenger(idx, "birthDate", e.target.value),
                                                                                className: "form-input pl-9 text-sm"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                                lineNumber: 478,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                        lineNumber: 476,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                                lineNumber: 474,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 33
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-slate-100 pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-500",
                                                    children: "Total Peserta"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-primary",
                                                    children: [
                                                        adults + children,
                                                        " orang"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 493,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-base font-bold mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-primary",
                                                    children: "Total Bayar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 498,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-accent",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(total)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 497,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleBook,
                                            className: "btn btn-primary w-full text-base flex items-center justify-center gap-2",
                                            children: "Lanjut ke Pembayaran"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 501,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-slate-400 text-center mt-2",
                                            children: "Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                            lineNumber: 507,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                                    lineNumber: 492,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                            lineNumber: 390,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                    lineNumber: 374,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
                lineNumber: 373,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(public)/tours/[slug]/page.tsx",
        lineNumber: 172,
        columnNumber: 9
    }, this);
}
_s(TourDetailPage, "Syud4dvHhCVMiuKSkMf58g9Z2uc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = TourDetailPage;
var _c;
__turbopack_context__.k.register(_c, "TourDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_4b70c113._.js.map