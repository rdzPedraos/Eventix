import React from "react";
import { usePage } from "@inertiajs/react";

import NavBar from "./partials/NavBar";
import MainSidebar from "./partials/MainSidebar";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [openSideBar, setOpenSidebar] = React.useState(false);

    const {
        app: { name },
        auth: { user, permissions },
    } = usePage<PageProps>().props;

    const hasPermissions = permissions.length > 0;

    return (
        <div className="h-screen grid grid-rows-[auto,1fr]">
            <NavBar
                user={user}
                openSidebar={openSideBar}
                setOpenSidebar={setOpenSidebar}
            />

            <div className="flex overflow-hidden">
                {hasPermissions && (
                    <MainSidebar
                        permissions={permissions}
                        openSidebar={openSideBar}
                        setOpenSidebar={setOpenSidebar}
                    />
                )}

                <div className="overflow-y-auto flex-1">
                    <main className="min-h-[calc(100%-30px)]">{children}</main>

                    <footer className="p-1 shadow text-center text-sm bg-slate-50 text-gray-500 bottom-0">
                        {name}, 2024 | Creado por
                        <a
                            href="https://github.com/rdzPedraos"
                            className="underline text-primary ml-1"
                        >
                            @rdzpedraos
                        </a>
                    </footer>
                </div>
            </div>
        </div>
    );
}
