import React from "react";
import { route } from "@ziggyjs";
import {
    DocumentArrowDownIcon,
    EyeIcon,
    PencilIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";

import { Button, Chip, Link, Tooltip } from "@nextui-org/react";
import { SurveyListResource } from "@/types/resources";
import { Activity } from "@/types/models";
import { Container, Table } from "@/components";
import Badge from "@/components/Badge";
import { usePage } from "@inertiajs/react";

type Props = {
    surveys: CollectionProps<SurveyListResource>;
    activity?: Activity;
};

export default function List({ surveys, activity }: Props) {
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
                renderCell={renderCell()}
                topContent={
                    <Button
                        as={Link}
                        href={route("surveys.create", { activity })}
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

function renderCell() {
    const { activity } = usePage().props;

    return (survey: SurveyListResource, columnKey: string) => {
        const closed = survey.status.key === "closed";

        switch (columnKey) {
            case "actions":
                return (
                    <div className="grid grid-cols-2">
                        {survey.status.key === "draft" ? (
                            <Tooltip content="Editar encuesta">
                                <Link
                                    href={route("surveys.edit", {
                                        activity,
                                        survey,
                                    })}
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
                                            activity,
                                            survey,
                                        })}
                                        className="text-default-500"
                                    >
                                        <EyeIcon width={18} />
                                    </Link>
                                </Tooltip>
                            )
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

            default:
                return survey[columnKey];
        }
    };
}

List.breadcrumb = ({ activity }: Props) => ({
    current: "Encuestas",
    items: [
        { to: route("home"), label: "Calendario" },
        { to: route("activities.index"), label: "Actividades" },
        { to: route("activities.edit", { activity }), label: activity.name },
    ],
});
