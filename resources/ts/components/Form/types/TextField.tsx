import React from "react";
import { Input } from "@nextui-org/react";
import { PropsField } from "./props";

export default function TextField({
    label,
    value,
    onChange,
    clearError,
    error,
}: PropsField) {
    const handleChange = (value: string) => {
        clearError();
        onChange(value);
    };

    return (
        <Input
            label={label}
            value={value}
            onValueChange={handleChange}
            isInvalid={!!error}
            errorMessage={error}
        />
    );
}
