const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.tsx",
        "./resources/**/*.ts",
        "./resources/**/*.blade.php",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            primary: "#00594E",
            secondary: "#B5A160",
            cta: "#005469"
        },
    },
    plugins: [
        nextui()
    ],
}

