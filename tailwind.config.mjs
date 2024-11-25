import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.tsx",
        "./resources/**/*.ts",
        "./resources/**/*.blade.php",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],

    plugins: [
        nextui({
            layout: {
                borderWidth: {
                    small: "1px",
                    medium: "1.5px",
                    large: "2px",
                },
            },

            themes: {
                light: {
                    colors: {
                        primary: {
                            background: "#00594e",
                            DEFAULT: "#00594e",

                            50: "#eaeff2",
                            100: "#d0e0df",
                            200: "#b8d2cf",
                            300: "#a3c3be",
                            400: "#9bc1bd",
                            500: "#72a39d",
                            600: "#5f9591",
                            700: "#46877f",
                            800: "#2f786f",
                            900: "#18675d",
                        },

                        secondary: {
                            background: "#ff6500",
                            DEFAULT: "#ff64500",

                            50: "#f9f6f1",
                            100: "#f2eee3",
                            200: "#e4dec6",
                            300: "#ded5b8",
                            400: "#d6cda6",
                            500: "#d0c399",
                            600: "#c8ba8b",
                            700: "#c2b17d",
                            800: "#bea970",
                            900: "#b5a260",
                        },
                    },
                }
            }
        })
    ],
}

