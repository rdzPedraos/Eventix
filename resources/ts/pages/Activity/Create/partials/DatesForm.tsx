import React from "react";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";

import { Scheduler } from "@/types/models";
import { now } from "@/components/Calendar/utils/calendar";
import { Container } from "@/components";
import SchedulerInput from "./SchedulerInput";

type Props = {
    schedulers: Scheduler[];
    setSchedulers: (schedulers: Scheduler[]) => void;
};

export default function DatesForm({ schedulers, setSchedulers }: Props) {
    const addScheduler = () => {
        setSchedulers([
            ...schedulers,
            {
                id: schedulers[schedulers.length - 1]?.id + 1 || 1,
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
