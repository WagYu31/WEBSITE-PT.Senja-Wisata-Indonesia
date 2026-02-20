import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#05073C",
                    50: "#E8E9F0",
                    100: "#C5C7DC",
                    200: "#9EA1C4",
                    300: "#777BAC",
                    400: "#585D98",
                    500: "#393F84",
                    600: "#2A2F6A",
                    700: "#1B2050",
                    800: "#0D1236",
                    900: "#05073C",
                },
                accent: {
                    DEFAULT: "#FC4C4D",
                    50: "#FFF0F0",
                    100: "#FFD6D6",
                    200: "#FFADAD",
                    300: "#FF8585",
                    400: "#FC5C5D",
                    500: "#FC4C4D",
                    600: "#E53535",
                    700: "#C01F1F",
                    800: "#9B0E0E",
                    900: "#750505",
                },
                blue: {
                    DEFAULT: "#2BBEE8",
                    50: "#E8F8FD",
                    100: "#C4EEFA",
                    200: "#9DE2F7",
                    300: "#76D6F4",
                    400: "#4ECAF1",
                    500: "#2BBEE8",
                    600: "#1AA4CC",
                    700: "#0D89B0",
                    800: "#056F93",
                    900: "#005576",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
            },
            fontFamily: {
                sans: ["var(--font-poppins)", "sans-serif"],
                serif: ["var(--font-playfair)", "serif"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                card: "0 4px 20px rgba(5, 7, 60, 0.08)",
                "card-hover": "0 12px 40px rgba(5, 7, 60, 0.16)",
                navbar: "0 2px 20px rgba(5, 7, 60, 0.12)",
            },
            animation: {
                "fade-up": "fadeUp 0.6s ease forwards",
                "fade-in": "fadeIn 0.4s ease forwards",
                float: "float 6s ease-in-out infinite",
                "spin-slow": "spin 8s linear infinite",
                "count-up": "countUp 2s ease forwards",
            },
            keyframes: {
                fadeUp: {
                    from: { opacity: "0", transform: "translateY(30px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
