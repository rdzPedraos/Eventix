import { Logo, Profile } from "@/components";
import { User } from "@/utils/PageProps";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import React from "react";

type Props = {
    user: User | null;
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
