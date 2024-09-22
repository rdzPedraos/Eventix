import React from "react";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";

import { Scheduler } from "@/types/models";
import { LoadCalendar, Container } from "@/components";
import { toastAlert } from "@/utils";
import SchedulerInput from "./SchedulerInput";

type Props = {
    schedulers: Scheduler[];
    setSchedulers: (schedulers: Scheduler[]) => void;
};

function allowAddScheduler(schedulers: Scheduler[]) {
    const allCompletes = schedulers.every(
        (scheduler) => scheduler.start_date && scheduler.end_date
    );

    return allCompletes;
}

export default function DatesForm({ schedulers, setSchedulers }: Props) {
    const addScheduler = () => {
        if (!allowAddScheduler(schedulers)) {
            return toastAlert(
                "No puedes definir otra fecha si no has completado la actual"
            );
        }

        const id = schedulers[schedulers.length - 1]?.id + 1 || 1;
        setSchedulers([...schedulers, { id } as Scheduler]);
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
        <>
            <Container>
                <h2 className="text-2xl mb-4">Cronograma</h2>
                <p className="mb-4">
                    Aqui puedes agregar todas las reuniones que desees 😉!
                    Además, puedes previsualizar tu calendario 📆
                </p>

                <div className="flex flex-col gap-2">
                    {schedulers.map((scheduler, index) => {
                        console.log("render", scheduler.id);

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

            <div className="mx-5 rounded-xl overflow-hidden">
                <LoadCalendar />
            </div>
        </>
    );
}
