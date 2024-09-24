import React from "react";

import {
    ExclamationCircleIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { Button, Tooltip } from "@nextui-org/react";

import { Scheduler } from "@/types/models";
import { now } from "@/components/Calendar/utils/calendar";
import { Container } from "@/components";
import SchedulerInput from "./SchedulerInput";
import { useActivityCreateContext } from "../context";

export default function DatesForm() {
    const { schedulers, setSchedulers, errors } = useActivityCreateContext();

    const addScheduler = () => {
        setSchedulers([
            ...schedulers,
            {
                id: Math.floor(Math.random() * 10000),
                start_date: now().toString(),
                end_date: now().add(1, "hour").toString(),
            } as Scheduler,
        ]);
    };

    const removeScheduler = (index: number) => {
        const newSchedulers = [...schedulers];
        newSchedulers.splice(index, 1);
        setSchedulers(newSchedulers);
    };

    const updateScheduler = (index: number) => {
        return (scheduler: Scheduler) => {
            const newSchedulers = [...schedulers];

            newSchedulers[index] = scheduler;
            setSchedulers(newSchedulers);
        };
    };

    return (
        <Container>
            <h2 className="text-2xl mb-4">Cronograma</h2>
            <p className="mb-4">
                Aqui puedes agregar todas las reuniones que desees 😉! Además,
                puedes previsualizar tu calendario 📆
            </p>

            <div className="flex flex-col gap-2">
                {schedulers.map((scheduler, index) => {
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
                                scheduler={scheduler}
                                onChange={updateScheduler(index)}
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
