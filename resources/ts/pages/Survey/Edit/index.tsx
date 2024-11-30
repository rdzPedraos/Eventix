import React from "react";
import { route } from "@ziggyjs";

import { Activity, Survey } from "@/types/models";
import FormCreateProvider from "./context";

import QuestionHeader from "./partials/QuestionHeader";
import QuestionList from "./partials/QuestionList";
import QuestionControls from "./partials/QuestionControls";

type Props = {
    survey: Survey;
    activity: Activity;
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

Edit.breadcrumb = ({ activity, survey }: Props) => ({
    current: survey.id ? `Editar ${survey.name}` : "Crear encuesta",
    items: [
        { to: route("home"), label: "Calendario" },
        { to: route("activities.index"), label: "Actividades" },
        { to: route("activities.edit", { activity }), label: activity.name },
        { to: route("surveys.index", { activity }), label: "Encuestas" },
    ],
});
