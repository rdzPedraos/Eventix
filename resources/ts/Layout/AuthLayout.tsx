import { PageProps } from "@/utils/PageProps";
import { usePage } from "@inertiajs/react";
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

export default function Layout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Navbar maxWidth="full" position="static" className="bg-primary">
                <NavbarBrand className="flex gap-1 items-end">
                    <Image src="/logo.png" height={40} isBlurred />
                    <h1 className="font-bold text-3xl text-gray-200">
                        Eventix
                    </h1>
                </NavbarBrand>

                <NavbarContent justify="end">
                    <Dropdown>
                        <DropdownTrigger>
                            <Avatar isBordered color="primary" />
                        </DropdownTrigger>

                        <DropdownMenu>
                            <DropdownItem textValue="perfil" className="gap-2">
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
            </Navbar>

            <main>{children}</main>
        </>
    );
}
