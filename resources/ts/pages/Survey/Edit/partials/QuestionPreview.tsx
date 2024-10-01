import React from "react";
import {
    Checkbox,
    Input,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/24/outline";

import { Question } from "@/types/models";
import { useFormCreateContext } from "../context";

function RenderField({ type, options }: Question) {
    switch (type) {
        case "text":
            return <Input isDisabled label="Respuesta de texto" />;
        case "number":
            return <Input isDisabled label="Respuesta númerica" />;
        case "date":
            return <Input isDisabled label="Fecha" />;
        case "radio":
            return (
                <RadioGroup>
                    {options.map((option, index) => (
                        <Radio key={index} isDisabled value="">
                            {option}
                        </Radio>
                    ))}
                </RadioGroup>
            );
        case "checkbox":
            return (
                <div className="flex flex-col">
                    {options.map((option, index) => (
                        <Checkbox key={index} isDisabled>
                            {option}
                        </Checkbox>
                    ))}
                </div>
            );
        case "select":
            return (
                <Select disabled label="Selecciona una opción">
                    <SelectItem key="1" value="1">
                        Opción 1
                    </SelectItem>
                </Select>
            );
    }
}

type Props = {
    question: Question;
};

export default function QuestionPreview({ question }: Props) {
    const { changeEditMode } = useFormCreateContext();

    return (
        <>
            <div className="flex justify-between mb-4">
                <p className="font-bold text-lg">
                    {question.label}
                    {question.is_required && (
                        <span className="text-danger">*</span>
                    )}
                </p>

                <button onClick={() => changeEditMode(question)}>
                    <PencilIcon width={20} />
                </button>
            </div>

            {RenderField(question)}
        </>
    );
}
