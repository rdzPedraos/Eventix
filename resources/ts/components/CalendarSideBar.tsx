import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { route } from "@ziggyjs";
import { CalendarDate } from "@internationalized/date";
import {
    Checkbox,
    DatePicker,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";

import { Sites } from "@/types/models";
import { useFormReturnType } from "@/hooks/useForm";
import useDebouncedEffect from "@/hooks/useDebouncedEffect";
import { useCalendarContext } from "./Calendar/CalendarContext";
import { updateDate } from "./Calendar/utils/calendar";

export type FilterProps = {
    search: string;
    site: string;
    enrolled: boolean;
};

type Props = {
    form: useFormReturnType<FilterProps>;
};

export default function CalendarSideBar({ form }: Props) {
    const { filters, setFilter, forceUpdate } = useCalendarContext();
    const { register } = form;
    const [sites, setSites] = useState<Sites[]>([]);

    useEffect(() => {
        axios.get(route("api.sites.list")).then((response) => {
            if (response.status === 200) {
                setSites(response.data);
            }
        });
    }, []);

    const day = useMemo(() => {
        const date = filters.day;
        return new CalendarDate(date.year(), date.month() + 1, date.date());
    }, [filters.day]);

    const onChangeDay = (day: CalendarDate) => {
        const newDay = updateDate(filters.day, {
            date: day.day,
            month: day.month - 1,
            year: day.year,
        });
        setFilter("day", newDay);
    };

    useDebouncedEffect(forceUpdate, 300, [form.data]);

    return (
        <div className="min-w-56 p-4">
            <h1 className="font-bold text-xl mb-4">Filtros</h1>

            <div className="flex flex-col gap-4">
                <Checkbox {...register("enrolled", "checkbox")}>
                    Inscritos
                </Checkbox>

                <DatePicker
                    color="primary"
                    label="Buscar fecha"
                    value={day}
                    onChange={onChangeDay}
                    showMonthAndYearPickers
                />

                <Input
                    color="primary"
                    label="Nombre del evento"
                    isClearable
                    {...register("search")}
                />

                <Select
                    color="primary"
                    label="Espacios académicos"
                    {...register("site", "select")}
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
            </div>
        </div>
    );
}
