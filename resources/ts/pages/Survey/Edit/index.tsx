import React from "react";
import { route } from "@ziggyjs";

import { Breadcrumb } from "@/components";
import FormCreateProvider from "./context";

import QuestionHeader from "./partials/QuestionHeader";
import QuestionList from "./partials/QuestionList";
import QuestionControls from "./partials/QuestionControls";

export default function index() {
    return (
        <>
            <Breadcrumb
                current="Editar encuesta"
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("activities.index"), label: "Actividades" },
                    { to: route("surveys.index"), label: "Encuestas" },
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
