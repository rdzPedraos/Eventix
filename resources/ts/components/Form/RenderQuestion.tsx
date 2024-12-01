import React from "react";
import { Question } from "@/types/models";

import { Container } from "@/components";
import CheckField from "@/components/Form/types/CheckField";
import RadioField from "@/components/Form/types/RadioField";
import SelectField from "@/components/Form/types/SelectField";
import TextField from "@/components/Form/types/TextField";
import DateField from "@/components/Form/types/DateField";
import NumberField from "./types/NumberField";

const types = {
    text: TextField,
    number: NumberField,
    date: DateField,
    radio: RadioField,
    checkbox: CheckField,
    select: SelectField,
};

type Props = {
    number: number;
    question: Question;
    value?: string;
    onChange?: (value: any) => void;
    clearError?: () => void;
    error?: string;
    disabled?: boolean;
};

export default function RenderQuestion({
    number,
    question,
    value,
    onChange = () => {},
    clearError = () => {},
    error,
    disabled,
}: Props) {
    let label = question.label.toLowerCase();
    label = label.charAt(0).toUpperCase() + label.slice(1);

    const Component = types[question.type];

    return (
        <Container>
            <p className="font-bold text-lg mb-4">
                {number}
                {") "}
                <span>{label}</span>
                {question.is_required && <span className="text-danger">*</span>}
            </p>

            <Component
                label={question.label}
                value={value}
                options={question.options}
                onChange={onChange}
                clearError={clearError}
                error={error}
                disabled={disabled}
            />
        </Container>
    );
}
