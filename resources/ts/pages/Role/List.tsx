import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Button, Link, Tooltip } from "@nextui-org/react";

import { Role } from "@/types/models";
import { Container, Table } from "@/components";

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

type Props = {
    roles: CollectionProps<Role>;
};

export default function List({ roles }: Props) {
    const { data, meta } = roles;

    return (
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
                topContent={
                    <Button
                        as={Link}
                        href={route("roles.create")}
                        color="primary"
                        variant="flat"
                        startContent={<PlusIcon width={20} />}
                    >
                        Crear rol
                    </Button>
                }
            />
        </Container>
    );
}

List.breadcrumb = {
    current: "Roles",
    items: [{ to: route("home"), label: "Calendario" }],
};
