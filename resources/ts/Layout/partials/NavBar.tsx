import React from "react";

import {
    Bars3Icon,
    CursorArrowRaysIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import { Logo, Profile } from "@/components";

type Props = {
    user: PageProps["auth"]["user"];
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>> | false;
};

export default function NavBar({ user, openSidebar, setOpenSidebar }: Props) {
    return (
        <Navbar maxWidth="full" position="static" className="bg-primary">
            {setOpenSidebar && (
                <button
                    onClick={() => setOpenSidebar((s) => !s)}
                    className="text-white mr-2"
                >
                    {openSidebar ? (
                        <XMarkIcon width={30} />
                    ) : (
                        <Bars3Icon width={30} />
                    )}
                </button>
            )}

            <NavbarBrand>
                <Logo />
            </NavbarBrand>

            {user ? (
                <NavbarContent justify="end">
                    <Profile user={user} />
                </NavbarContent>
            ) : (
                <Link
                    href="/login"
                    className="text-white hover:underline flex gap-1 items-center"
                >
                    Iniciar sesión
                    <CursorArrowRaysIcon width={20} height={20} />
                </Link>
            )}
        </Navbar>
    );
}
