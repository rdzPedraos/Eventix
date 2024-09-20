import React, { useEffect } from "react";
import { route } from "@ziggyjs";

import useForm from "@/hooks/useForm";
import { PastelColors } from "@/utils/Colors";
import { Breadcrumb } from "@/components";

import Header from "./partials/Header";
import BasicForm from "./partials/BasicForm";
import DatesForm from "./partials/DatesForm";
import { Scheduler } from "@/types/models";

type ActivityCreateFormFields = {
    name: String;
    description: String;
    image: File;
    color: String;
    schedulers: Scheduler[];
};

export default function Create() {
    const { register, submit, data, setData, errors } = useForm({
        schedulers: [],
    } as ActivityCreateFormFields);

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

    const setSchedulers = (schedulers: Scheduler[]) => {
        setData("schedulers", schedulers);
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
                <DatesForm
                    schedulers={data.schedulers}
                    setSchedulers={setSchedulers}
                />
            </div>
        </>
    );
}
