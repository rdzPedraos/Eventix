import React, { useEffect } from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";

import { ActivityCreateFormFields } from "./type";
import { Scheduler } from "@/types/models";
import { ActivityResource } from "@/types/resources";

import useForm from "@/hooks/useForm";
import { PastelColors } from "@/utils/Colors";
import { Breadcrumb } from "@/components";

import Header from "./partials/Header";
import BasicForm from "./partials/BasicForm";
import DatesForm from "./partials/DatesForm";

export default function Create() {
    const { activity } = usePage<{
        activity: ActivityResource;
    }>().props;

    const { register, submit, data, setData, errors } = useForm(
        activity || ({ schedulers: [] } as ActivityCreateFormFields)
    );

    useEffect(() => {
        if (activity) return;
        const random = Math.floor(Math.random() * PastelColors.length);
        setData("color", PastelColors[random]);
    }, []);

    const setSchedulers = (schedulers: Scheduler[]) => {
        setData("schedulers", schedulers);
    };

    const setImage = (image: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setData("image", e.target?.result as string);
        reader.readAsDataURL(image);
    };

    const onSubmit = (params = {}) => {
        if (activity) {
            return submit(
                "put",
                route("activities.update", { activity, ...params })
            );
        }

        submit("post", route("activities.store", params));
    };

    const onSave = () => onSubmit();
    const onPublish = () => onSubmit({ action: "publish" });

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
                <Header onPublish={onPublish} onSave={onSave} />
                <BasicForm
                    registerInp={register}
                    errors={errors}
                    data={data}
                    setImage={setImage}
                />
                <DatesForm
                    schedulers={data.schedulers}
                    setSchedulers={setSchedulers}
                />
            </div>
        </>
    );
}
