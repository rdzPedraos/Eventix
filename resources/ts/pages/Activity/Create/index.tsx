import React, { act, useMemo } from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";

import { ActivityCreateFormFields } from "./type";
import { Scheduler } from "@/types/models";
import { ActivityResource } from "@/types/resources";

import useForm from "@/hooks/useForm";
import { Breadcrumb, LoadCalendar } from "@/components";

import Header from "./partials/Header";
import BasicForm from "./partials/BasicForm";
import DatesForm from "./partials/DatesForm";
import { PastelColors, realisticConfetti, triggerAlert } from "@/utils";
import { EventType } from "@/components/Calendar/utils/types";
import { createDay } from "@/components/Calendar/utils/calendar";

function defaultActivity() {
    const activity = {} as ActivityCreateFormFields;
    const randColor = Math.floor(Math.random() * PastelColors.length);

    activity.schedulers = [];
    activity.color = PastelColors[randColor];

    return activity;
}

function buildEvent(
    activity: ActivityCreateFormFields,
    scheduler: Scheduler
): EventType {
    return {
        id: scheduler.id.toString(),
        title: activity.name,
        description: activity.description,
        color: activity.color,
        startDate: createDay(scheduler.start_date),
        endDate: createDay(scheduler.end_date),
        style: "dashed",
    };
}

export default function Create() {
    const { activity } = usePage<{
        activity: ActivityResource;
    }>().props;

    const { register, submit, data, setData, errors } =
        useForm<ActivityCreateFormFields>(activity || defaultActivity());

    const setSchedulers = (schedulers: Scheduler[]) => {
        setData("schedulers", schedulers);
    };

    const setImage = (image: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setData("image", e.target?.result as string);
        reader.readAsDataURL(image);
    };

    const onSubmit = (params = {}, actions = {}) => {
        if (activity) {
            return submit(
                "put",
                route("activities.update", { activity, ...params }),
                actions
            );
        }

        submit("post", route("activities.store", params), actions);
    };

    const onSave = () =>
        triggerAlert((resolve, reject) => {
            onSubmit(undefined, {
                onError: reject,
                onFinish: resolve,
            });
        });

    const onPublish = () =>
        triggerAlert((resolve, reject) => {
            onSubmit(
                { action: "publish" },
                {
                    onError: reject,
                    onFinish: resolve,
                    onSuccess: realisticConfetti,
                }
            );
        });

    const customEvents = useMemo(
        () => data.schedulers.map((sch) => buildEvent(data, sch)),
        [data]
    );

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

                <div className="mx-5 rounded-xl overflow-clip shadow">
                    <LoadCalendar
                        staticEvents={customEvents}
                        exceptActivityId={activity.id}
                    />
                </div>
            </div>
        </>
    );
}
