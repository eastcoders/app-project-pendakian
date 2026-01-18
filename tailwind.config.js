/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Existing app colors
                "primary": "#1A3C34",
                "accent": "#00B865",
                "background": "#f6f8f7",
                "surface": "#ffffff",
                // Marketplace-specific colors
                "background-light": "#f6f8f7",
                "background-dark": "#102219",
                "active-dark": "#2F4F4F",
                "price-green": "#3CB371",
            },
            fontFamily: {
                "sans": ["Plus Jakarta Sans", "sans-serif"],
                "display": ["Plus Jakarta Sans", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "1.5rem",
                "xl": "2rem",
                "full": "9999px"
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
