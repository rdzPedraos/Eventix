import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";

import { Container } from "@/components";
import BasicForm from "./partials/BasicForm";
import RolesForm from "./partials/RolesForm";

type Props = {};

export default function Edit({}: Props) {
    const { auth } = usePage<PageProps>().props;

    const can_list_users = auth.permissions.includes("users.list");
    const can_add_roles = auth.permissions.includes("users.set_roles");

    const items = [{ label: "Calendario", to: route("home") }];
    if (can_list_users) {
        items.push({ label: "Usuarios", to: route("users.index") });
    }

    return (
        <div className="flex flex-col gap-4">
            <Container>
                <BasicForm />
            </Container>

            {can_add_roles && (
                <Container>
                    <RolesForm />
                </Container>
            )}
        </div>
    );
}

Edit.breadcrumb = {
    current: "Configuración de usuario",
    items: [
        { to: route("home"), label: "Calendario" },
        { to: route("users.index"), label: "Usuarios" },
    ],
};
