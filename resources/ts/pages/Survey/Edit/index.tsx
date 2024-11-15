import React from "react";
import { route } from "@ziggyjs";

import { Survey } from "@/types/models";
import FormCreateProvider from "./context";

import QuestionHeader from "./partials/QuestionHeader";
import QuestionList from "./partials/QuestionList";
import QuestionControls from "./partials/QuestionControls";

type Props = {
    survey: Survey;
};
export default function Edit({}: Props) {
    return (
        <FormCreateProvider>
            <div className="flex flex-col gap-4 max-w-lg mt-4 mx-auto">
                <QuestionControls />
                <QuestionHeader />
                <QuestionList />
            </div>
        </FormCreateProvider>
    );
}

Edit.breadcrumb = ({ survey }: Props) => ({
    current: survey.id ? "Editar encuesta" : "Crear encuesta",
    items: [
        { to: route("home"), label: "Calendario" },
        { to: route("activities.index"), label: "Actividades" },
        {
            to: route("surveys.index", {
                activity: survey.activity_id,
            }),
            label: "Encuestas",
        },
    ],
});
