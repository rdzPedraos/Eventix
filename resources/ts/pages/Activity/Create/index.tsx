import React, { useEffect } from "react";
import { route } from "@ziggyjs";

import useForm from "@/hooks/useForm";
import { PastelColors } from "@/utils/Colors";
import { Breadcrumb } from "@/components";

import Header from "./partials/Header";
import BasicForm from "./partials/BasicForm";

export default function Create() {
    const { register, submit, setData, errors } = useForm(
        {} as ActivityCreateFormFields
    );

    useEffect(() => {
        const random = Math.floor(Math.random() * PastelColors.length);
        setData("color", PastelColors[random]);
    }, []);

    const onSubmit = (action) => {
        return () =>
            submit("post", route("activities.store", { action }), {
                preserveState: true,
            });
    };

    return (
        <>
            <Breadcrumb
                current="Nueva actividad"
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("activities.index"), label: "Actividades" },
                ]}
            />

            <div className="flex flex-col gap-4">
                <Header onSubmit={onSubmit} />
                <BasicForm registerInp={register} errors={errors} />
            </div>
        </>
    );
}
