import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { PropsField } from "./props";

export default function SelectField({
    label,
    value,
    options,
    onChange,
    clearError,
    error,
}: PropsField) {
    const selectedOptions = value?.split("|");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
            .split(",")
            .filter((v) => v)
            .join("|");

        clearError();
        onChange(value);
    };

    return (
        <Select
            label={label}
            isInvalid={!!error}
            errorMessage={error}
            defaultSelectedKeys={selectedOptions}
            onChange={handleChange}
        >
            {options.map((option, index) => (
                <SelectItem key={option}>{option}</SelectItem>
            ))}
        </Select>
    );
}
