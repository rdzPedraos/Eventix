import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";

import { Survey } from "@/types/models";
import { Breadcrumb } from "@/components";
import FormCreateProvider from "./context";

import QuestionHeader from "./partials/QuestionHeader";
import QuestionList from "./partials/QuestionList";
import QuestionControls from "./partials/QuestionControls";

export default function index() {
    const { survey } = usePage<{ survey: Survey }>().props;

    return (
        <>
            <Breadcrumb
                current={survey.id ? "Editar encuesta" : "Crear encuesta"}
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

            <FormCreateProvider>
                <div className="flex flex-col gap-4 max-w-lg mt-4 mx-auto">
                    <QuestionControls />
                    <QuestionHeader />
                    <QuestionList />
                </div>
            </FormCreateProvider>
        </>
    );
}
