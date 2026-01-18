/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2F4F4F", // Dark Slate Gray
                accent: "#3CB371", // Nature Green
                background: "#F8F9FA", // Off-White
                surface: "#FFFFFF",
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', "sans-serif"],
            },
            borderRadius: {
                '3xl': '1.5rem',
            },
        },
    },
    plugins: [],
}
