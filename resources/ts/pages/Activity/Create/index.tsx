import React from "react";
import { route } from "@ziggyjs";
import ActivityCreateProvider from "./context";
import CreateActivity from "./partials";

export default function Create() {
    return (
        <ActivityCreateProvider>
            <CreateActivity />
        </ActivityCreateProvider>
    );
}

Create.breadcrumb = ({activity}) => ({
    current: activity ? "Editar actividad" : "Nueva actividad",
    items: [
        { to: route("home"), label: "Calendario" },
        { to: route("activities.index"), label: "Actividades" },
    ]
})
