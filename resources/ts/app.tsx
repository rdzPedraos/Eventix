import "./bootstrap";
import "../css/app.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp, router } from "@inertiajs/react";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "./Layout/AuthLayout";
import { Toaster } from "react-hot-toast";

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx");

        const search =
            pages[`./pages/${name}.tsx`] || pages[`./pages/${name}/index.tsx`];
        let page: any = await search();

        if (page.default.layout === undefined) {
            page.default.layout = (page: React.ReactNode) => (
                <Layout children={page} />
            );
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <NextUIProvider navigate={(path) => router.get(path)}>
                <Toaster />
                <App {...props} />
            </NextUIProvider>
        );
    },
});
