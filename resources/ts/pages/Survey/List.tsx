import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { DocumentArrowDownIcon, PencilIcon } from "@heroicons/react/24/solid";

import { Chip, Link, Tooltip } from "@nextui-org/react";
import { SurveyListResource } from "@/types/resources";
import { Breadcrumb, Container, Table } from "@/components";
import Badge from "@/components/Badge";

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

        case "trigger":
            return <Badge>{survey.trigger.label}</Badge>;

        case "trigger_at":
            return survey.trigger.date || "-";

        case "answer_count":
            return survey.answers_count.toString();

        case "status":
            return (
                <Chip
                    isDisabled={survey.is_closed}
                    className="capitalize"
                    color={survey.status.color}
                    size="sm"
                    variant="flat"
                >
                    {survey.status.label}
                </Chip>
            );

        case "activity":
            return (
                <Link
                    className="block max-w-28 text-sm hover:underline"
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

    const disabledKeys = data
        .filter((surveys) => surveys.is_closed)
        .map((survey) => survey.id.toString());

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
                    disabledKeys={disabledKeys}
                    columns={[
                        {
                            uid: "activity",
                            label: "Actividad",
                            align: "center",
                        },
                        { uid: "name", label: "Nombre" },
                        { uid: "description", label: "Descripción" },
                        {
                            uid: "trigger",
                            label: "Disparador",
                        },
                        {
                            uid: "trigger_at",
                            label: "Fecha",
                            align: "center",
                        },
                        {
                            uid: "answer_count",
                            label: "Respuestas",
                            align: "center",
                        },
                        { uid: "status", label: "Estado", align: "center" },
                        { uid: "actions", label: "Acciones", align: "center" },
                    ]}
                    renderCell={renderCell}
                />
            </Container>
        </>
    );
}
