import React, { useMemo } from "react";
import { CalendarDate } from "@internationalized/date";
import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { createDay } from "@/components/Calendar/utils/calendar";

import { useFormCreateContext } from "../context";
import { Container, EditableContent } from "@/components";

export default function QuestionHeader() {
    const { data, setData, register, triggerTypes } = useFormCreateContext();

    const trigger_date = useMemo(() => {
        if (!data.trigger_date || data.published_trigger != "custom")
            return null;

        const date = createDay(data.trigger_date);
        return new CalendarDate(date.year(), date.month() + 1, date.date());
    }, [data.trigger_date, data.published_trigger]);

    return (
        <>
            <Container>
                <div className="flex gap-4">
                    <Select
                        label="Tipo de disparador"
                        {...register("published_trigger", "select")}
                    >
                        {triggerTypes.map((trigger) => (
                            <SelectItem key={trigger.key} value={trigger.key}>
                                {trigger.value}
                            </SelectItem>
                        ))}
                    </Select>

                    <DatePicker
                        label="Fecha de lanzamiento"
                        isDisabled={data.published_trigger != "custom"}
                        value={trigger_date}
                        onChange={(date) => {
                            setData("trigger_date", date.toString());
                        }}
                    />
                </div>
            </Container>

            <Container>
                <EditableContent
                    {...register("name", "editable_content")}
                    className="text-2xl font-bold w-full mb-4"
                    placeholder="Título del formulario"
                />

                <EditableContent
                    {...register("description", "editable_content")}
                    className="text-gray-600 w-full"
                    placeholder="Descripción del formulario"
                />
            </Container>
        </>
    );
}
