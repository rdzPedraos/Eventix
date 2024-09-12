/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.tsx",
        "./resources/**/*.ts",
        "./resources/**/*.blade.php",
    ],
    theme: {
        extend: {},
        colors: {
            primary: "#00594E",
            secondary: "#B5A160",
            cta: "#005469"
        },
    },
    plugins: [],
}

