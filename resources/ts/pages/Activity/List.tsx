import React from "react";
import { usePage } from "@inertiajs/react";
import { Chip, Tooltip } from "@nextui-org/react";

import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ActivityResource } from "@/types/resources";

import { Breadcrumb, Table } from "@/components";
import { route } from "@ziggyjs";

const renderCell = (activity: ActivityResource, columnKey: string) => {
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
            if (activity.status.isClosed) return null;

            return (
                <Tooltip content="Revisar actividad">
                    <PencilSquareIcon
                        width={18}
                        className="cursor-pointer text-default-500 mx-auto"
                    />
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
        activities: CollectionProps<ActivityResource>;
    }>().props;

    const disabledKeys = data
        .filter((activity) => activity.status.isClosed)
        .map((activity) => activity.id.toString());

    return (
        <>
            <Breadcrumb
                className="px-5 py-3"
                current="Actividades"
                items={[{ to: route("home"), label: "Calendario" }]}
            />

            <div className="px-5">
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
                />
            </div>
        </>
    );
}
