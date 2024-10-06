import React from "react";
import { Radio, RadioGroup } from "@nextui-org/react";
import { PropsField } from "./props";

export default function RadioField({
    label,
    value,
    options,
    onChange,
    clearError,
    error,
    disabled,
}: PropsField) {
    const handleChange = (value: string) => {
        clearError();
        onChange(value);
    };

    return (
        <RadioGroup
            label={label}
            defaultValue={value}
            onValueChange={handleChange}
            errorMessage={error}
            isInvalid={!!error}
            isDisabled={disabled}
        >
            {options.map((option, index) => (
                <Radio key={index} value={option}>
                    {option}
                </Radio>
            ))}
        </RadioGroup>
    );
}
