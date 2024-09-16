import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Button,
    Checkbox,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
} from "@nextui-org/react";
import React from "react";
import { Question } from "./utils/types";

type Props = {
    question: Question;
    handleEditClick: (event: React.MouseEvent, id: number) => void;
};

export default function QuestionPreview({ question, handleEditClick }: Props) {
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">
                    {question.text}
                    {question.isRequired && (
                        <span className="text-red-500 ml-1">*</span>
                    )}
                </h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleEditClick(e, question.id)}
                    aria-label="Editar pregunta"
                >
                    <PencilIcon className="w-4 h-4" />
                </Button>
            </div>
            {question.description && (
                <p className="mb-4 text-gray-600">{question.description}</p>
            )}
            {question.type === "text" && (
                <input
                    placeholder="Respuesta de texto"
                    disabled
                    className="w-full border p-2 rounded"
                />
            )}
            {question.type === "number" && (
                <input
                    type="number"
                    placeholder="Respuesta numérica"
                    disabled
                    className="w-full border p-2 rounded"
                />
            )}
            {question.type === "checkbox" && (
                <div className="space-y-2 w-full">
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox id={`q${question.id}-option${index}`} />
                            <label htmlFor={`q${question.id}-option${index}`}>
                                {option}
                            </label>
                            {/*<Label
                        htmlFor={`q${question.id}-option${index}`}
                    >
                        {option}
                    </Label>*/}
                        </div>
                    ))}
                </div>
            )}
            {question.type === "radio" && (
                <RadioGroup className="w-full">
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2"
                        >
                            <Radio
                                value={option}
                                id={`q${question.id}-option${index}`}
                            />
                            {/*<Label
                        htmlFor={`q${question.id}-option${index}`}
                    >
                        {option}
                    </Label>*/}
                        </div>
                    ))}
                </RadioGroup>
            )}
            {question.type === "select" && (
                <Select disabled label="Selecciona una opción">
                    {question.options.map((option, index) => (
                        <SelectItem key={index} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </Select>
            )}
        </>
    );
}
