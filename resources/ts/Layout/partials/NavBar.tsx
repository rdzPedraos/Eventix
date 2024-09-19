import React from "react";
import { Link } from "@inertiajs/react";

import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import { Logo, Profile } from "@/components";

type Props = {
    user: PageProps["auth"]["user"];
};

export default function NavBar({ user }: Props) {
    return (
        <Navbar maxWidth="full" position="static" className="bg-primary">
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
