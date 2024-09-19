import React from "react";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";

type Props = {
    user: PageProps["auth"]["user"];
};

export default function Profile({ user }: Props) {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar isBordered color="primary" size="sm" />
            </DropdownTrigger>

            <DropdownMenu>
                <DropdownItem textValue="perfil" className="gap-2">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
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
    );
}
