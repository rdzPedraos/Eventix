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
        extend: {
            colors: {
                primary: "#00594E",
            },
        },

    },
    plugins: [
        nextui({
            layout: {
                borderWidth: {
                    small: "1px",
                    medium: "1.5px",
                    large: "2px",
                },

                navbar: {
                    color: "blue",
                }
            },

            themes: {
                light: {
                    colors: {
                        primary: {
                            background: "#00594E",

                            50: "#E6F4F3",
                            100: "#C0E6E0",
                            200: "#99D8CD",
                            300: "#73CAB9",
                            400: "#4DBCA6",
                            500: "#00594E",
                            600: "#3A8B7E",
                            700: "#2D6D63",
                            800: "#1F4F48",
                            900: "#12322D",
                        },
                    },
                }
            }
        })
    ],
}

