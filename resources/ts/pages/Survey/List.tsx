import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import {
    DocumentArrowDownIcon,
    EyeIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";

import { Chip, Link, Tooltip } from "@nextui-org/react";
import { SurveyListResource } from "@/types/resources";
import { Container, Table } from "@/components";
import Badge from "@/components/Badge";
import { Activity } from "@/types/models";

const renderCell = (survey: SurveyListResource, columnKey: string) => {
    const closed = survey.status.key === "closed";

    switch (columnKey) {
        case "actions":
            return (
                <div className="grid grid-cols-2">
                    {survey.status.key === "draft" ? (
                        <Tooltip content="Editar encuesta">
                            <Link
                                href={route("surveys.edit", { survey })}
                                className="text-default-500"
                            >
                                <PencilIcon width={18} />
                            </Link>
                        </Tooltip>
                    ) : (
                        !closed && (
                            <Tooltip content="Ver encuesta">
                                <Link
                                    href={route("surveys.show", {
                                        survey: survey.id,
                                    })}
                                    className="text-default-500"
                                >
                                    <EyeIcon width={18} />
                                </Link>
                            </Tooltip>
                        )
                    )}

                    {survey.published_at && (
                        <Tooltip content="Generar reporte">
                            <a
                                href={route("answer.report", { survey })}
                                className="cursor-pointer text-primary-700 inline-block"
                            >
                                <DocumentArrowDownIcon width={18} />
                            </a>
                        </Tooltip>
                    )}
                </div>
            );

        case "trigger":
            return (
                <Badge className={closed ? "opacity-50" : ""}>
                    {survey.trigger.label}
                </Badge>
            );

        case "trigger_at":
            return survey.trigger.date || "-";

        case "answer_count":
            return survey.answers_count.toString();

        case "status":
            return (
                <Chip
                    isDisabled={closed}
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

type Props = {
    surveys: CollectionProps<SurveyListResource>;
    activity?: Activity;
};

export default function List({ surveys }: Props) {
    const { data, meta } = surveys;

    const disabledKeys = data
        .filter((surveys) => surveys.status.key === "closed")
        .map((survey) => survey.id.toString());

    return (
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
                        align: "center",
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
    );
}

List.breadcrumb = ({ activity }: Props) => {
    const items = [{ to: route("home"), label: "Calendario" }];
    let current = activity
        ? `Encuestas de la actividad ${activity.name}`
        : "Encuestas";

    return { current, items };
};
