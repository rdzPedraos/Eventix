import React from "react";
import { DatePicker, TimeInput } from "@nextui-org/react";
import { CalendarDate, Time } from "@internationalized/date";

import { Scheduler } from "@/types/models";
import {
    createDay,
    now,
    updateDate,
} from "@/components/Calendar/utils/calendar";
import { DayType } from "@/components/Calendar/utils/types";

type Props = {
    scheduler: Scheduler;
    onChange: (scheduler: Scheduler) => void;
    hasError: boolean;
};

function getData(start_date: string, end_date: string) {
    const start = start_date ? createDay(start_date) : now();
    const end = end_date ? createDay(end_date) : now().add(1, "hour");

    return { start, end };
}

function buildDate(date?: DayType, type?: "day" | "time"): any {
    if (!date) return null;

    return type == "day"
        ? new CalendarDate(date.year(), date.month() + 1, date.date())
        : new Time(date.hour(), date.minute());
}

export default function SchedulerInput({
    scheduler,
    onChange,
    hasError,
}: Props) {
    const { start, end } = getData(scheduler.start_date, scheduler.end_date);

    const onChangeDay = (day: CalendarDate) => {
        const updates = { year: day.year, month: day.month - 1, date: day.day };
        onChange({
            ...scheduler,
            start_date: updateDate(start, updates).toString(),
            end_date: updateDate(end, updates).toString(),
        });
    };

    const onChangeStartTime = (time: Time) => {
        const updates = { hour: time.hour, minute: time.minute };

        onChange({
            ...scheduler,
            start_date: updateDate(start, updates).toString(),
        });
    };

    const onChangeEndTime = (time: Time) => {
        const updates = { hour: time.hour, minute: time.minute };

        onChange({
            ...scheduler,
            end_date: updateDate(end, updates).toString(),
        });
    };

    return (
        <div className="flex justify-start gap-4">
            <DatePicker
                label="Fecha"
                size="sm"
                isRequired
                className="w-36"
                defaultValue={buildDate(start, "day")}
                onChange={onChangeDay}
                showMonthAndYearPickers
                color={hasError ? "danger" : "default"}
            />
            <TimeInput
                label="Inicio"
                size="sm"
                isRequired
                className="w-24"
                defaultValue={buildDate(start, "time")}
                onChange={onChangeStartTime}
                color={hasError ? "danger" : "default"}
            />
            <TimeInput
                label="Cierre"
                size="sm"
                isRequired
                className="w-24"
                defaultValue={buildDate(end, "time")}
                onChange={onChangeEndTime}
                color={hasError ? "danger" : "default"}
            />
        </div>
    );
}
