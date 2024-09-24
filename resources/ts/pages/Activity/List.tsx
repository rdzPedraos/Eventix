import React from "react";
import { usePage } from "@inertiajs/react";
import { Button, Chip, Link, Tooltip } from "@nextui-org/react";

import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import { ActivityListResource } from "@/types/resources";

import { Breadcrumb, Container, Table } from "@/components";
import { route } from "@ziggyjs";

const renderCell = (activity: ActivityListResource, columnKey: string) => {
    switch (columnKey) {
        case "status":
            const status = activity.status;

            return (
                <Chip
                    className="mx-auto flex capitalize"
                    color={status.color}
                    size="sm"
                    variant="flat"
                >
                    {status.label}
                </Chip>
            );

        case "actions":
            if (!activity.editable) return null;

            return (
                <Tooltip content="Revisar actividad">
                    <Link href={route("activities.edit", { activity })}>
                        <PencilSquareIcon
                            width={18}
                            className="cursor-pointer text-default-500 mx-auto"
                        />
                    </Link>
                </Tooltip>
            );

        default:
            return activity[columnKey];
    }
};

export default function List() {
    const {
        activities: { data, meta },
    } = usePage<{
        activities: CollectionProps<ActivityListResource>;
    }>().props;

    const disabledKeys = data
        .filter((activity) => activity.status.isClosed)
        .map((activity) => activity.id.toString());

    return (
        <>
            <Breadcrumb
                current="Actividades"
                items={[{ to: route("home"), label: "Calendario" }]}
            />

            <Container>
                <Table
                    aria-label="Actividades"
                    data={data}
                    disabledKeys={disabledKeys}
                    pagination={meta}
                    columns={[
                        { uid: "name", label: "Titulo" },
                        { uid: "description", label: "Descripción" },
                        { uid: "status", label: "Estado" },
                        { uid: "actions", label: "Acciones" },
                    ]}
                    renderCell={renderCell}
                    topContent={
                        <Button
                            as={Link}
                            href={route("activities.create")}
                            color="primary"
                            variant="flat"
                            startContent={<PlusIcon width={20} />}
                        >
                            Crear actividad
                        </Button>
                    }
                />
            </Container>
        </>
    );
}
