import { Breadcrumb, Container } from "@/components";
import { route } from "@ziggyjs";
import React from "react";
import BasicForm from "./partials/BasicForm";
import { usePage } from "@inertiajs/react";
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
        <>
            <Breadcrumb current="Configuración de usuario" items={items} />

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
        </>
    );
}
