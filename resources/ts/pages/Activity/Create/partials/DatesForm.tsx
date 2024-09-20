import React from "react";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button, DatePicker, TimeInput } from "@nextui-org/react";
import { Calendar, Container } from "@/components";
import { Scheduler } from "@/types/models";
import toast from "react-hot-toast";
import { parseDate, parseTime } from "@internationalized/date";

type Props = {
    schedulers: Scheduler[];
    setSchedulers: (schedulers: Scheduler[]) => void;
};

function allowAddScheduler(schedulers: Scheduler[]) {
    const allCompletes = schedulers.every(
        (scheduler) => scheduler.day && scheduler.start && scheduler.end
    );

    return allCompletes;
}

export default function DatesForm({ schedulers, setSchedulers }: Props) {
    const addScheduler = () => {
        if (!allowAddScheduler(schedulers)) {
            return toast.error(
                "No puedes definir otra fecha si no has completado la actual"
            );
        }

        setSchedulers([...schedulers, {} as Scheduler]);
    };

    const removeScheduler = (index: number) => {
        const newSchedulers = [...schedulers];
        newSchedulers.splice(index, 1);
        setSchedulers(newSchedulers);
    };

    const editScheduler = (
        id: number,
        key: keyof Scheduler,
        value: Scheduler[keyof Scheduler]
    ) => {
        const newSchedulers = [...schedulers];
        newSchedulers[id][key] = value as string & number;
        console.log({ id, key, value, newSchedulers });
        setSchedulers(newSchedulers);
    };

    return (
        <>
            <Container>
                <h2 className="text-2xl mb-4">Cronograma</h2>
                <p className="mb-4">
                    Aqui puedes agregar todas las reuniones que desees 😉!
                    Además, puedes ir previsualiando tu calendario 📆
                </p>

                <div className="flex flex-col gap-2">
                    {schedulers.map(({ day, start, end }, index) => (
                        <div
                            key={day + start + end}
                            className="flex justify-start gap-4"
                        >
                            <button
                                className="text-danger"
                                onClick={() => removeScheduler(index)}
                            >
                                <TrashIcon width={20} />
                            </button>

                            <DatePicker
                                label="Fecha"
                                size="sm"
                                isRequired
                                className="w-36"
                                value={day ? parseDate(day) : null}
                                onChange={(day) =>
                                    editScheduler(index, "day", day.toString())
                                }
                            />
                            <TimeInput
                                label="Inicio"
                                size="sm"
                                isRequired
                                className="w-24"
                                defaultValue={start ? parseTime(start) : null}
                                onChange={(time) =>
                                    editScheduler(
                                        index,
                                        "start",
                                        time.toString()
                                    )
                                }
                            />
                            <TimeInput
                                label="Cierre"
                                size="sm"
                                isRequired
                                className="w-24"
                                defaultValue={end ? parseTime(end) : null}
                                onChange={(time) =>
                                    editScheduler(index, "end", time.toString())
                                }
                            />
                        </div>
                    ))}
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
                <Calendar />
            </div>
        </>
    );
}
