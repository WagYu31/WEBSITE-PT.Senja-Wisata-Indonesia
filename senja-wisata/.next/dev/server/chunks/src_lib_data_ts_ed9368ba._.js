module.exports = [
"[project]/src/lib/data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
];

//# sourceMappingURL=src_lib_data_ts_ed9368ba._.js.map