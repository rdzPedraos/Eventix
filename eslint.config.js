import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
    {
        files: ["resources/ts/**/*.{js,jsx,ts,tsx}"],
        languageOptions: { globals: globals.browser },
        settings: {
            react: { version: "detect" },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    prettier,
    {
        plugins: { prettier: pluginPrettier },
        rules: {
            "prettier/prettier": "error",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/display-name": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "react/no-unescaped-entities": "off",
            "react/no-children-prop": "off",
            "no-empty-pattern": "off",
            "no-case-declarations": "off",
        },
    },
];
