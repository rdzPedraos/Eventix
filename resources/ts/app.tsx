import "./bootstrap";
import "../css/app.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "./Layout/AuthLayout";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
        let page: any =
            pages[`./pages/${name}.tsx`] ?? pages[`./pages/${name}/index.tsx`];

        if (page.default.layout === undefined) {
            page.default.layout = (page: React.ReactNode) => (
                <Layout children={page} />
            );
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <NextUIProvider>
                <App {...props} />
            </NextUIProvider>
        );
    },
});
