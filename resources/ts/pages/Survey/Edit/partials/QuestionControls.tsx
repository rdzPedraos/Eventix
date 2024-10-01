import React, { useMemo } from "react";
import { Container } from "@/components";
import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { useFormCreateContext } from "../context";
import { createDay } from "@/components/Calendar/utils/calendar";
import { CalendarDate } from "@internationalized/date";

export default function QuestionControls() {
    const { triggerTypes, data, setData, register } = useFormCreateContext();

    const trigger_date = useMemo(() => {
        const date = createDay(data.trigger_date);
        return new CalendarDate(date.year(), date.month() + 1, date.date());
    }, [data.trigger_date]);

    return (
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
                    defaultValue={trigger_date}
                    onChange={(date) => {
                        setData("trigger_date", date.toString());
                    }}
                />
            </div>
        </Container>
    );
}
