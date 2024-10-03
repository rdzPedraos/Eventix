import { useMemo } from "react";
import { route } from "@ziggyjs";

import { Scheduler } from "@/types/models";
import { ActivityCreateFormFields } from "./type";

import { createDay } from "@/components/Calendar/utils/calendar";
import { EventType } from "@/components/Calendar/utils/types";

import { PastelColors, realisticConfetti, triggerAlert } from "@/utils";
import useForm from "@/hooks/useForm";
import { ActivityResource } from "@/types/resources";

function emptyActivity() {
    const activity = {} as ActivityCreateFormFields;
    const randColor = Math.floor(Math.random() * PastelColors.length);

    activity.schedulers = [];
    activity.color = PastelColors[randColor];

    return activity;
}

function buildEvent(scheduler: Scheduler, color: string): EventType {
    return {
        id: scheduler.id.toString(),
        title: "XXXX",
        description: "XXXX XX XXXXXX",
        color: color,
        startDate: createDay(scheduler.start_date),
        endDate: createDay(scheduler.end_date),
        style: "dashed",
    };
}

export function useHook(activity: ActivityResource) {
    const { register, submit, data, setData, errors, clearErrors } =
        useForm<ActivityCreateFormFields>(activity || emptyActivity());

    const setSchedulers = (schedulers: Scheduler[]) => {
        setData("schedulers", schedulers);
    };

    const saveImage = (image: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setData("image", e.target?.result as string);
        reader.readAsDataURL(image);
    };

    const events = useMemo(
        () => data.schedulers.map((sch) => buildEvent(sch, data.color)),
        [data.schedulers, data.color]
    );

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

    const save = () =>
        triggerAlert((resolve, reject) => {
            onSubmit(undefined, {
                onError: reject,
                onFinish: resolve,
            });
        });

    const publish = () =>
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

    return {
        register,
        data,
        setData,
        clearErrors,
        errors,
        events,

        schedulers: data.schedulers,
        setSchedulers,
        saveImage,

        save,
        publish,
    };
}
