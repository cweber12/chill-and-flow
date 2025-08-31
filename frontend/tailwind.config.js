/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "425px",
                ms: "860px",
            },
            colors: {
                mainClr: "#26667F",
                secondaryClr: "#D6DAC8",
            },
        },
    },
    plugins: [],
};
