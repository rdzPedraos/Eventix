import React from "react";
import { usePage } from "@inertiajs/react";

import NavBar from "./partials/NavBar";
import MainSidebar from "./partials/MainSidebar";
import { Link } from "@nextui-org/react";

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
        <div className="h-screen grid grid-rows-[auto,1fr] bg-gray-50">
            <NavBar
                user={user}
                openSidebar={openSideBar}
                setOpenSidebar={hasPermissions ? setOpenSidebar : false}
            />

            <div className="flex overflow-hidden">
                {hasPermissions && (
                    <MainSidebar
                        permissions={permissions}
                        openSidebar={openSideBar}
                        setOpenSidebar={setOpenSidebar}
                    />
                )}

                <div className="flex-1 flex flex-col overflow-y-auto px-4">
                    <main className="flex-1">{children}</main>

                    <footer className="px-1 py-2 text-center text-sm text-gray-500 bottom-0">
                        {name}, 2024 | Creado por
                        <Link
                            target="_blank"
                            href="https://github.com/rdzPedraos"
                            className="ml-1"
                            size="sm"
                        >
                            @rdzpedraos
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
}
