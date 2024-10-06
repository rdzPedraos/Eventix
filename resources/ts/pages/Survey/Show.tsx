import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { Link } from "@nextui-org/react";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

import { Survey } from "@/types/models";
import { Breadcrumb, Container } from "@/components";
import RenderQuestion from "@/components/Form/RenderQuestion";

export default function index() {
    const { survey } = usePage<{ survey: Survey }>().props;

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
