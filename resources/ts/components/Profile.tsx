import { Auth } from "@/utils/PageProps";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

type Props = {
    user: Auth["user"];
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
