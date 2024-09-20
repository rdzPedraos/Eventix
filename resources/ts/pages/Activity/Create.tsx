import { Breadcrumb } from "@/components";
import { route } from "@ziggyjs";
import React from "react";

type Props = {};

export default function Create({}: Props) {
    return (
        <>
            <Breadcrumb
                className="px-5 py-3"
                current="Nueva actividad"
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("activities.index"), label: "Actividades" },
                ]}
            />

            <div className="bg-white shadow rounded-xl py-2 px-5 mx-6">
                <h1 className="text-2xl font-semibold text-default-900">
                    Nueva actividad
                </h1>
            </div>
        </>
    );
}
