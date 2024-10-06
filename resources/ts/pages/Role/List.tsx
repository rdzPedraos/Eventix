import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link, Tooltip } from "@nextui-org/react";

import { Role } from "@/types/models";
import { Breadcrumb, Container, Table } from "@/components";

type Props = {};

const renderCell = (role: Role, columnKey: string) => {
    switch (columnKey) {
        case "actions":
            return (
                <>
                    <Tooltip content="Editar rol">
                        <Link
                            href={route("roles.edit", { role })}
                            className="cursor-pointer text-default-500"
                        >
                            <PencilSquareIcon width={18} />
                        </Link>
                    </Tooltip>
                </>
            );

        default:
            return role[columnKey];
    }
};

export default function List({}: Props) {
    const {
        roles: { data, meta },
    } = usePage<{
        roles: CollectionProps<Role>;
    }>().props;

    return (
        <>
            <Breadcrumb
                current="Roles"
                items={[{ to: route("home"), label: "Calendario" }]}
            />

            <Container>
                <Table
                    aria-label="Roles"
                    data={data}
                    pagination={meta}
                    columns={[
                        { uid: "name", label: "Nombre" },
                        {
                            uid: "updated_at",
                            label: "Última modificación",
                            align: "center",
                        },
                        {
                            uid: "users_count",
                            label: "Usuarios",
                            align: "center",
                        },
                        {
                            uid: "actions",
                            label: "Acciones",
                            align: "center",
                        },
                    ]}
                    renderCell={renderCell}
                />
            </Container>
        </>
    );
}
