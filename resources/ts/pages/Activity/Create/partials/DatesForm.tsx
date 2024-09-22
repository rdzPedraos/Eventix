import React, { useState } from "react";
import { route } from "@ziggyjs";

import axios from "axios";
import {
    getLocalTimeZone,
    parseDate,
    parseTime,
    today,
} from "@internationalized/date";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button, DatePicker, Link, TimeInput } from "@nextui-org/react";
import { DayType, ViewModeTypes } from "@/components/Calendar/utils/types";
import days from "@/components/Calendar/utils/calendar";
import { Scheduler } from "@/types/models";
import { Calendar, Container } from "@/components";
import { toastAlert } from "@/utils";

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
    console.log(schedulers);
    const [events, setEvents] = useState([]);

    const addScheduler = () => {
        if (!allowAddScheduler(schedulers)) {
            return toastAlert(
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

    const onSearchEvents = (day: DayType, mode: ViewModeTypes) => {
        axios
            .get(route("api.activities.index"), { params: { day, mode } })
            .then(({ data }) => {
                const dates = data.map(
                    ({ id, activity, start_date, end_date }) => ({
                        id: id,
                        title: activity.name,
                        description: activity.description,
                        color: activity.color,
                        startDate: days(start_date),
                        endDate: days(end_date),
                    })
                );

                setEvents(dates);
            });
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
                                showMonthAndYearPickers
                                minValue={today(getLocalTimeZone())}
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
                <Calendar events={events} onChangeEvents={onSearchEvents} />
            </div>
        </>
    );
}
