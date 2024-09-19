import React from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/utils/PageProps";
import NavBar from "./partials/NavBar";
import Sidebar from "./partials/Sidebar";

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
                {auth && <Sidebar permissions={auth.permissions} />}
                {children}
            </main>
        </>
    );
}
