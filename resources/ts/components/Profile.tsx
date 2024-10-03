import React from "react";
import { route } from "@ziggyjs";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import {
    ArrowLeftStartOnRectangleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

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
                <DropdownItem
                    color="secondary"
                    textValue="perfil"
                    className="gap-2"
                >
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </DropdownItem>
                <DropdownItem
                    href={route("users.edit", { user: user.id })}
                    startContent={<Cog6ToothIcon width={20} />}
                >
                    Configuración
                </DropdownItem>
                <DropdownItem
                    color="danger"
                    className="text-danger"
                    href={route("logout")}
                    startContent={<ArrowLeftStartOnRectangleIcon width={20} />}
                >
                    Salir
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
