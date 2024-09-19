import React from "react";
import { usePage } from "@inertiajs/react";

import NavBar from "./partials/NavBar";
import SideBar from "./partials/SideBar";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <NavBar user={auth?.user} />
            <main>
                {auth && <SideBar permissions={auth.permissions} />}
                {children}
            </main>
        </>
    );
}
