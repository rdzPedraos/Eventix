import React from "react";
import { route } from "@ziggyjs";
import { router, usePage } from "@inertiajs/react";
import { Button, Link } from "@nextui-org/react";
import { ArrowLongLeftIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Survey } from "@/types/models";
import { Breadcrumb, Container } from "@/components";
import RenderQuestion from "@/components/Form/RenderQuestion";
import Confirm from "@/components/Confirm";

export default function index() {
    const { survey } = usePage<{ survey: Survey }>().props;

    const onDelete = () => {
        router.delete(
            route("surveys.destroy", {
                survey,
            })
        );
    };

    return (
        <>
            <Breadcrumb
                current={"Revisar encuesta"}
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("activities.index"), label: "Actividades" },
                    {
                        to: route("surveys.index", {
                            activity: survey.activity_id,
                        }),
                        label: "Encuestas",
                    },
                ]}
            />

            <div className="flex flex-col gap-4 max-w-lg mt-4 mx-auto">
                <div className="flex justify-end">
                    {!survey.deleted_at && (
                        <Confirm
                            title="Eliminar actividad"
                            text="Al realizar esta acción, la actividad será eliminada permanentemente y perderá su visibilidad."
                            confirmColor="danger"
                        >
                            <Button
                                color="danger"
                                variant="flat"
                                onClick={onDelete}
                            >
                                <TrashIcon width={20} />
                            </Button>
                        </Confirm>
                    )}
                </div>

                <Container>
                    <Link
                        className="mb-2 text-sm hover:underline"
                        target="_blank"
                        href={route("activities.edit", {
                            activity: survey.activity_id,
                        })}
                    >
                        <ArrowLongLeftIcon width={20} />
                        Ver actividad
                    </Link>

                    <h1 className="text-2xl font-bold w-full">{survey.name}</h1>
                    <p className="text-gray-600 w-full">{survey.description}</p>
                </Container>

                {survey.questions.map((question, index) => {
                    return (
                        <RenderQuestion
                            disabled={true}
                            key={index}
                            number={index + 1}
                            question={question}
                        />
                    );
                })}
            </div>
        </>
    );
}