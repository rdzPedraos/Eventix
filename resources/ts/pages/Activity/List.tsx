import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { Button, Chip, Link, Tooltip } from "@nextui-org/react";

import {
    DocumentArrowDownIcon,
    PencilSquareIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import { ActivityListResource } from "@/types/resources";

import { Container, Table } from "@/components";

const renderCell = (activity: ActivityListResource, columnKey: string) => {
    switch (columnKey) {
        case "status":
            const status = activity.status;

            return (
                <Chip
                    isDisabled={activity.is_closed}
                    className="capitalize"
                    color={status.color}
                    size="sm"
                    variant="flat"
                >
                    {status.label}
                </Chip>
            );

        case "actions":
            return (
                <>
                    <Tooltip content="Revisar actividad">
                        <Link
                            isDisabled={activity.is_closed}
                            href={route("activities.edit", { activity })}
                            className="cursor-pointer text-default-500 inline-block mr-2"
                        >
                            <PencilSquareIcon width={18} />
                        </Link>
                    </Tooltip>

                    <Tooltip content="Reporte de asistencia">
                        <a
                            href={route("events.report", { activity })}
                            className="cursor-pointer text-primary-700 inline-block"
                        >
                            <DocumentArrowDownIcon width={18} />
                        </a>
                    </Tooltip>
                </>
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
        .filter((activity) => activity.is_closed)
        .map((activity) => activity.id.toString());

    return (
        <Container>
            <Table
                aria-label="Actividades"
                data={data}
                disabledKeys={disabledKeys}
                pagination={meta}
                columns={[
                    { uid: "name", label: "Titulo" },
                    { uid: "description", label: "Descripción" },
                    {
                        uid: "enrollments",
                        label: "Inscritos",
                        align: "center",
                    },
                    { uid: "status", label: "Estado", align: "center" },
                    { uid: "actions", label: "Acciones", align: "center" },
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
    );
}

List.breadcrumb = {
    current: "Actividades",
    items: [{ to: route("home"), label: "Calendario" }]
}
