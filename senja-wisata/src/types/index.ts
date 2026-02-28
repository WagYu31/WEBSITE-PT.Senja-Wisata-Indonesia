export interface Tour {
    id: number;
    slug: string;
    title: string;
    location: string;
    duration: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice?: number;
    image: string;
    gallery: string[];
    category: string;
    badge: string;
    includes: string[];
    maxPax: number;
    minAge: number;
    description: string;
    itinerary: ItineraryDay[];
    island: string;
    departureTime?: string;
}

export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
}

export interface Destination {
    id: number;
    name: string;
    country: string;
    island: string;
    tours: number;
    image: string;
    description: string;
}

export interface Testimonial {
    id: number;
    name: string;
    from: string;
    rating: number;
    text: string;
    tour: string;
    avatar: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: "owner" | "admin" | "user";
    avatar?: string;
}

export interface Booking {
    id: string;
    tourId: number;
    tourTitle: string;
    tourImage: string;
    date: string;
    duration: string;
    guests: number;
    total: number;
    status: "pending" | "confirmed" | "completed" | "cancelled";
}
