import React from "react";
import { route } from "@ziggyjs";
import { useActivityCreateContext } from "../context";
import { Breadcrumb, LoadCalendar } from "@/components";

import Header from "./Header";
import BasicForm from "./BasicForm";
import DatesForm from "./DatesForm";

export default function CreateActivity() {
    const { activity, events } = useActivityCreateContext();

    return (
        <>
            <Breadcrumb
                current={activity ? "Editar actividad" : "Nueva actividad"}
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("activities.index"), label: "Actividades" },
                ]}
            />

            <div className="flex flex-col gap-4">
                <Header />
                <BasicForm />
                <DatesForm />

                <div className="mx-5 rounded-xl overflow-clip shadow">
                    <LoadCalendar
                        staticEvents={events}
                        exceptActivityId={activity?.id}
                    />
                </div>
            </div>
        </>
    );
}
