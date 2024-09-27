import React from "react";
import { route } from "@ziggyjs";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";

import { Tooltip } from "@nextui-org/react";
import { SurveyListResource } from "@/types/resources";
import { Breadcrumb, Container, Table } from "@/components";

const renderCell = (survey: SurveyListResource, columnKey: string) => {
    switch (columnKey) {
        case "actions":
            return (
                <Tooltip content="Editar encuesta">
                    <Link
                        href={route("surveys.edit", { survey })}
                        className="cursor-pointer text-default-500 inline-block"
                    >
                        <PencilSquareIcon width={18} />
                    </Link>
                </Tooltip>
            );

        default:
            return survey[columnKey];
    }
};

export default function List() {
    const {
        surveys: { data, meta },
    } = usePage<{
        surveys: CollectionProps<SurveyListResource>;
    }>().props;

    return (
        <>
            <Breadcrumb
                current="Encuestas"
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("activities.index"), label: "Actividades" },
                ]}
            />

            <Container>
                <Table
                    aria-label="Lugares académicos"
                    data={data}
                    pagination={meta}
                    columns={[
                        { uid: "name", label: "Nombre" },
                        { uid: "description", label: "Descripción" },
                        { uid: "trigger", label: "" },
                        { uid: "actions", label: "Acciones", align: "center" },
                    ]}
                    renderCell={renderCell}
                />
            </Container>
        </>
    );
}
