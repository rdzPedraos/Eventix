import React from "react";
import { UserResource } from "@/types/resources";
import { Table } from "@/components";
import { Button } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { route } from "@ziggyjs";
import { router, usePage } from "@inertiajs/react";

type Props = {
    builders: CollectionProps<UserResource>;
};

export default function List({ builders }: Props) {
    const { data, meta } = builders;

    return (
        <Table
            aria-label="Equipo"
            data={data}
            pagination={meta}
            columns={[
                { uid: "remove", label: "" },
                { uid: "document", label: "Documento" },
                { uid: "name", label: "Nombre" },
                { uid: "email", label: "Correo electrónico" },
                { uid: "phone", label: "Teléfono" },
            ]}
            renderCell={renderCell()}
        />
    );
}

function renderCell() {
    const { activity } = usePage().props;

    return (user: UserResource, columnKey: string) => {
        switch (columnKey) {
            case "document":
                return `${user.document_type} ${user.document}`;

            case "remove":
                return (
                    <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        onClick={() =>
                            router.delete(
                                route("activities.team.destroy", {
                                    activity,
                                    user,
                                })
                            )
                        }
                    >
                        <TrashIcon width={18} />
                    </Button>
                );
            default:
                return user[columnKey];
        }
    };
}
