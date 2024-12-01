import React, { useMemo } from "react";
import { DatePicker, Input } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

import { PropsField } from "./props";
import { createDay } from "@/components/Calendar/utils/calendar";

export default function DateField({
    label,
    value,
    onChange,
    clearError,
    error,
    disabled,
}: PropsField) {
    const defaultValue = useMemo(() => {
        if (!value) return null;
        const date = createDay(value);
        return new CalendarDate(date.year(), date.month() + 1, date.date());
    }, []);

    const handleChange = (value: CalendarDate) => {
        clearError();
        onChange(value.toString());
    };

    return (
        <DatePicker
            defaultValue={defaultValue}
            onChange={handleChange}
            label={label}
            isInvalid={!!error}
            errorMessage={error}
            isDisabled={disabled}
        />
    );
}
