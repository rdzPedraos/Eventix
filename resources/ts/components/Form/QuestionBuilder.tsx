import React from "react";
import { Button, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { Question, QuestionType } from "./utils/types";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

type Props = {
    question: Question;
    updateQuestion: (id: number, updates: Partial<Question>) => void;
    deleteQuestion: (id: number, event: React.MouseEvent) => void;
    updateOption: (questionId: number, index: number, value: string) => void;
    addOption: (questionId: number) => void;
    deleteOption: (questionId: number, index: number) => void;
};

export default function QuestionBuilder({
    question,
    deleteQuestion,
    updateQuestion,
    addOption,
    updateOption,
    deleteOption,
}: Props) {
    return (
        <>
            <Select
                label="Tipo de pregunta"
                value={question.type}
                onChange={(value) =>
                    updateQuestion(question.id, {
                        type: value.target.value as QuestionType,
                    })
                }
                /*onValueChange={(value: QuestionType) =>
          updateQuestion(question.id, { type: value })
      }*/
            >
                <SelectItem key="text">Texto</SelectItem>
                <SelectItem key="number">Número</SelectItem>
                <SelectItem key="checkbox">Checkbox</SelectItem>
                <SelectItem key="radio">Radio Button</SelectItem>
                <SelectItem key="select">Select</SelectItem>
            </Select>
            <label htmlFor={`question-${question.id}`} className="sr-only">
                Pregunta
            </label>
            <input
                id={`question-${question.id}`}
                value={question.text}
                onChange={(e) =>
                    updateQuestion(question.id, {
                        text: e.target.value,
                    })
                }
                placeholder="Escribe tu pregunta aquí"
                className="text-lg font-semibold mb-2 w-full border-none focus:outline-none focus:ring-0 p-0"
            />
            <label htmlFor={`description-${question.id}`} className="sr-only">
                Descripción de la pregunta
            </label>
            <input
                id={`description-${question.id}`}
                value={question.description}
                onChange={(e) =>
                    updateQuestion(question.id, {
                        description: e.target.value,
                    })
                }
                placeholder="Añade una descripción (opcional)"
                className="mb-4 w-full border-none focus:outline-none focus:ring-0 p-0 text-sm text-gray-600"
            />
            {["checkbox", "radio", "select"].includes(question.type) && (
                <>
                    <ul className="space-y-2 w-full">
                        {question.options.map((option, index) => (
                            <li
                                key={index}
                                className="flex items-center w-full"
                            >
                                <input
                                    placeholder={`Opción ${index + 1}`}
                                    value={option}
                                    onChange={(e) =>
                                        updateOption(
                                            question.id,
                                            index,
                                            e.target.value
                                        )
                                    }
                                    className="flex-grow border-none focus:outline-none focus:ring-0 p-0"
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteOption(question.id, index);
                                    }}
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <Button
                        onClick={() => addOption(question.id)}
                        variant="light"
                        className="mt-2 w-full"
                    >
                        <PlusCircleIcon className="w-4 h-4 mr-2" />
                        Agregar opción
                    </Button>
                </>
            )}
            <div className="flex justify-end items-center mt-4 space-x-4">
                <div className="flex items-center space-x-2">
                    <label
                        htmlFor={`required-${question.id}`}
                        className="text-sm"
                    >
                        Obligatoria
                    </label>
                    <Checkbox
                        id={`required-${question.id}`}
                        checked={question.isRequired}
                        onChange={(checked) => {
                            updateQuestion(question.id, {
                                isRequired: !!checked.target.value as boolean,
                            });
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <Button
                    variant="ghost"
                    onClick={(e) => deleteQuestion(question.id, e)}
                >
                    <TrashIcon className="w-4 h-4" />
                </Button>
            </div>
        </>
    );
}
