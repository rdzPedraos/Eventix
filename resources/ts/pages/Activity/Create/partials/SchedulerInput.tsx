import React from "react";
import {
    DatePicker,
    Select,
    SelectItem,
    TimeInput,
    Tooltip,
} from "@nextui-org/react";
import { CalendarDate, Time } from "@internationalized/date";

import { Scheduler, Sites } from "@/types/models";
import {
    createDay,
    now,
    updateDate,
} from "@/components/Calendar/utils/calendar";
import { DayType } from "@/components/Calendar/utils/types";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

type Props = {
    scheduler: Scheduler;
    onChange: (scheduler: Scheduler) => void;
    errors: string[];
    sites: Sites[];
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
    errors,
    sites,
}: Props) {
    const { start, end } = getData(scheduler.start_date, scheduler.end_date);
    const inputColor = errors.length > 0 ? "danger" : "default";

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

    const onChangeSite = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const site_id = Number(e.target.value);
        onChange({ ...scheduler, site_id });
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
                color={inputColor}
            />
            <TimeInput
                label="Inicio"
                size="sm"
                isRequired
                className="w-24"
                defaultValue={buildDate(start, "time")}
                onChange={onChangeStartTime}
                color={inputColor}
            />
            <TimeInput
                label="Cierre"
                size="sm"
                isRequired
                className="w-24"
                defaultValue={buildDate(end, "time")}
                onChange={onChangeEndTime}
                color={inputColor}
            />

            <Select
                label="Lugar"
                size="sm"
                isRequired
                className="w-48"
                disallowEmptySelection={true}
                defaultSelectedKeys={[scheduler.site_id?.toString()]}
                onChange={onChangeSite}
                color={inputColor}
            >
                {sites.map((site) => (
                    <SelectItem key={site.id} textValue={site.name}>
                        <p>{site.name}</p>
                        <p className="text-default-600 text-xs">
                            {site.address}
                        </p>
                    </SelectItem>
                ))}
            </Select>

            {inputColor === "danger" && (
                <Tooltip
                    content={
                        <ol className="text-sm">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ol>
                    }
                    placement="top"
                    color="danger"
                >
                    <ExclamationCircleIcon className="text-danger" width={20} />
                </Tooltip>
            )}
        </div>
    );
}
