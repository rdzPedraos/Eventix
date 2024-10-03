import React from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { PropsField } from "./props";

export default function CheckField({
    label,
    value,
    options,
    onChange,
    clearError,
    error,
}: PropsField) {
    const selectedOptions = value?.split("|");

    const handleChange = (values: string[]) => {
        const value = values.filter((v) => v).join("|");
        clearError();
        onChange(value);
    };

    return (
        <CheckboxGroup
            label={label}
            defaultValue={selectedOptions}
            onValueChange={handleChange}
            errorMessage={error}
            isInvalid={!!error}
        >
            {options.map((option, index) => (
                <Checkbox key={index} value={option}>
                    {option}
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
}
