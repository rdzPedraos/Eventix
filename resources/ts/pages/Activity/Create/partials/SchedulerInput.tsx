import days from "@/components/Calendar/utils/calendar";
import { Scheduler } from "@/types/models";
import { CalendarDate, Time } from "@internationalized/date";
import { DatePicker, TimeInput } from "@nextui-org/react";
import { Dayjs } from "dayjs";
import React from "react";

type Props = {
    scheduler: Scheduler;
    onChange: (scheduler: Scheduler) => void;
};

function getData(
    start_date,
    end_date
): {
    start: Dayjs | null;
    end: Dayjs | null;
} {
    if (!start_date) {
        return {
            start: null,
            end: null,
        };
    }

    const start = days(start_date);
    const end = days(end_date);

    return { start, end };
}

function buildDate(date: Dayjs | null, type: "day" | "time"): any {
    if (!date) return null;

    switch (type) {
        case "day":
            return new CalendarDate(date.year(), date.month() + 1, date.date());
        case "time":
            return new Time(date.hour(), date.minute());
    }
}

export default function SchedulerInput({ scheduler, onChange }: Props) {
    const date = getData(scheduler.start_date, scheduler.end_date);

    const onUpdateDay = (day: CalendarDate) => {
        const start_date = date.start
            .set("year", day.year)
            .set("month", day.month - 1)
            .set("date", day.day)
            .toString();

        const end_date = date.end
            .set("year", day.year)
            .set("month", day.month - 1)
            .set("date", day.day)
            .toString();

        onChange({ ...scheduler, start_date, end_date });
    };

    const onChangeStart = (time: Time) => {
        const start_date = date.start
            .set("hour", time.hour)
            .set("minute", time.minute)
            .toString();

        onChange({ ...scheduler, start_date });
    };

    const onChangeEnd = (time: Time) => {
        const end_date = date.end
            .set("hour", time.hour)
            .set("minute", time.minute)
            .toString();

        onChange({ ...scheduler, end_date });
    };

    return (
        <div className="flex justify-start gap-4">
            <DatePicker
                label="Fecha"
                size="sm"
                isRequired
                className="w-36"
                defaultValue={buildDate(date.start, "day")}
                onChange={onUpdateDay}
                showMonthAndYearPickers
            />
            <TimeInput
                label="Inicio"
                size="sm"
                isRequired
                className="w-24"
                defaultValue={buildDate(date.start, "time")}
                onChange={onChangeStart}
            />
            <TimeInput
                label="Cierre"
                size="sm"
                isRequired
                className="w-24"
                defaultValue={buildDate(date.end, "time")}
                onChange={onChangeEnd}
            />
        </div>
    );
}
