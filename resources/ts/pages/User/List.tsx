import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { Link, Tooltip } from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/24/solid";

import { UserResource } from "@/types/resources";
import { Container, Table } from "@/components";
import Badge from "@/components/Badge";

const renderCell = (user: UserResource, columnKey: string) => {
    switch (columnKey) {
        case "actions":
            return (
                <>
                    <Tooltip content="Editar lugar">
                        <Link
                            href={route("users.edit", { user: user.id })}
                            className="cursor-pointer text-default-500"
                        >
                            <PencilIcon width={18} />
                        </Link>
                    </Tooltip>
                </>
            );

        case "roles":
            return (
                <>
                    {user.roles.map((role, index) => (
                        <Badge key={index}>{role}</Badge>
                    ))}
                </>
            );

        default:
            return <p>{user[columnKey]}</p>;
    }
};

type Props = {
    users: CollectionProps<UserResource>;
};

export default function List({ users }: Props) {
    const { data, meta } = users;

    return (
        <Container>
            <Table
                aria-label="Usuarios"
                data={data}
                pagination={meta}
                columns={[
                    { uid: "id", label: "ID" },
                    { uid: "name", label: "Nombre" },
                    { uid: "email", label: "Correo electrónico" },
                    { uid: "phone", label: "Teléfono" },
                    { uid: "roles", label: "Roles" },
                    { uid: "actions", label: "Acciones", align: "center" },
                ]}
                renderCell={renderCell}
            />
        </Container>
    );
}

List.breadcrumb = () => ({
    current: "Usuarios",
    items: [{ to: route("home"), label: "Calendario" }],
});
