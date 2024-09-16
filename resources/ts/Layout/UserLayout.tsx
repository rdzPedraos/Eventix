import { PageProps } from "@/utils/PageProps";
import { Link, usePage } from "@inertiajs/react";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Navbar,
    NavbarBrand,
    NavbarContent,
} from "@nextui-org/react";
import React from "react";
import Logo from "../components/Logo";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Navbar maxWidth="full" position="static" className="bg-primary">
                <NavbarBrand>
                    <Logo />
                </NavbarBrand>

                {auth.user ? (
                    <NavbarContent justify="end">
                        <Dropdown>
                            <DropdownTrigger>
                                <Avatar isBordered color="primary" size="sm" />
                            </DropdownTrigger>

                            <DropdownMenu>
                                <DropdownItem
                                    textValue="perfil"
                                    className="gap-2"
                                >
                                    <p>{auth.user.name}</p>
                                    <p>{auth.user.email}</p>
                                </DropdownItem>
                                <DropdownItem
                                    color="danger"
                                    className="text-danger"
                                    href="/logout"
                                >
                                    Salir
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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

            <main>{children}</main>
        </>
    );
}
