import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { DocumentArrowDownIcon, PencilIcon } from "@heroicons/react/24/solid";

import { Link, Tooltip } from "@nextui-org/react";
import { SurveyListResource } from "@/types/resources";
import { Breadcrumb, Container, Table } from "@/components";

const renderCell = (survey: SurveyListResource, columnKey: string) => {
    switch (columnKey) {
        case "actions":
            return (
                <>
                    <Tooltip content="Editar encuesta" as={Link}>
                        <Link
                            href={route("surveys.edit", { survey })}
                            className="cursor-pointer text-default-500 inline-block mr-2"
                        >
                            <PencilIcon width={18} />
                        </Link>
                    </Tooltip>

                    <Tooltip content="Generar reporte" as={Link}>
                        <a
                            href={route("answer.report", { survey })}
                            className="cursor-pointer text-primary-700 inline-block"
                        >
                            <DocumentArrowDownIcon width={18} />
                        </a>
                    </Tooltip>
                </>
            );

        case "activity":
            return (
                <Link
                    className="block max-w-28 text-sm hover:underline  truncate"
                    href={route("activities.edit", {
                        activity: survey.activity.id,
                    })}
                >
                    {survey.activity.name}
                </Link>
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
                        {
                            uid: "activity",
                            label: "Actividad",
                            align: "center",
                        },
                        { uid: "actions", label: "Acciones", align: "center" },
                    ]}
                    renderCell={renderCell}
                />
            </Container>
        </>
    );
}
