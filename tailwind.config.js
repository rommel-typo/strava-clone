/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'strava': ['Boathouse', 'sans-serif'],
            },
            boxShadow: {
                'subtle': '0 2px 20px rgba(0, 0, 0, 0.04)',
            }
        },
    },
    plugins: [],
}
