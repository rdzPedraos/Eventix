import React from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";

import { now } from "@/components/Calendar/utils/calendar";
import { Scheduler } from "@/types/models";
import { ActivityCreateFormFields } from "../type";
import { useActivityCreateContext } from "../context";
import { Container } from "@/components";
import SchedulerInput from "./SchedulerInput";

export default function DatesForm() {
    const { sites, schedulers, setSchedulers, errors, clearErrors } =
        useActivityCreateContext();

    const addScheduler = () => {
        clearErrors("schedulers");
        const site_id = schedulers[schedulers.length - 1]?.site_id;

        setSchedulers([
            ...schedulers,
            {
                id: Math.floor(Math.random() * 10000),
                start_date: now().toString(),
                end_date: now().add(1, "hour").toString(),
                site_id,
            } as Scheduler,
        ]);
    };

    const removeScheduler = (index: number) => {
        const newSchedulers = [...schedulers];
        newSchedulers.splice(index, 1);
        setSchedulers(newSchedulers);
        removeErrors(index);
    };

    const updateScheduler = (index: number) => {
        return (scheduler: Scheduler) => {
            const newSchedulers = [...schedulers];
            newSchedulers[index] = scheduler;
            setSchedulers(newSchedulers);
            removeErrors(index);
        };
    };

    const removeErrors = (index: number) => {
        [
            `schedulers.${index}.start_date`,
            `schedulers.${index}.end_date`,
            `schedulers.${index}.site_id`,
        ].forEach((key) => clearErrors(key as keyof ActivityCreateFormFields));
    };

    return (
        <Container>
            <h2 className="text-2xl mb-4">Cronograma</h2>
            <p className="mb-4">
                Aqui puedes agregar todas las reuniones que desees 😉! Además,
                puedes previsualizar tu calendario 📆
            </p>

            <span className="text-sm text-danger">{errors.schedulers}</span>

            <div className="flex flex-col gap-2 overflow-x-auto">
                {schedulers.map((scheduler, index) => {
                    const e = [
                        errors[`schedulers.${index}.start_date`],
                        errors[`schedulers.${index}.end_date`],
                        errors[`schedulers.${index}.site_id`],
                    ].filter((e) => e);

                    return (
                        <div
                            key={scheduler.id}
                            className="flex justify-start gap-4"
                        >
                            <button
                                className="text-danger"
                                onClick={() => removeScheduler(index)}
                            >
                                <TrashIcon width={20} />
                            </button>

                            <SchedulerInput
                                errors={e}
                                scheduler={scheduler}
                                onChange={updateScheduler(index)}
                                sites={sites}
                            />
                        </div>
                    );
                })}
            </div>

            <Button
                className="mt-2 mb-4"
                onClick={addScheduler}
                variant="light"
                size="sm"
                startContent={<PlusIcon width={20} />}
            >
                Añadir fecha
            </Button>
        </Container>
    );
}
