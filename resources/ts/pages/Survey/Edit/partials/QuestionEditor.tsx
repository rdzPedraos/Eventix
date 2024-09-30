import React from "react";
import { Button, Checkbox, Select, SelectItem } from "@nextui-org/react";

import { useFormCreateContext } from "../context";
import { Question } from "@/types/models";

import { EditableContent } from "@/components";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

type Props = {
    question: Question;
    onUpdate: (question: Question) => void;
    onDelete: (question: Question) => void;
};

export default function QuestionEditor({
    question,
    onUpdate,
    onDelete,
}: Props) {
    const { questionTypes } = useFormCreateContext();

    const updateField = (field: keyof Question, value: any) => {
        onUpdate({ ...question, [field]: value });
    };

    const deleteOption = (index: number) => {
        const newOptions = [...question.options];
        newOptions.splice(index, 1);
        updateField("options", newOptions);
    };

    const addOption = () => {
        const newOptions = [...(question.options ?? []), ""];
        updateField("options", newOptions);
    };

    return (
        <>
            <Select
                label="Tipo de pregunta"
                className="mb-4"
                variant="faded"
                defaultSelectedKeys={[question.type]}
                onSelectionChange={(selected) =>
                    updateField("type", selected.currentKey)
                }
            >
                {questionTypes.map((type) => (
                    <SelectItem key={type.key} value={type.key}>
                        {type.value}
                    </SelectItem>
                ))}
            </Select>

            <EditableContent
                value={question.label}
                onChange={(value) => updateField("label", value)}
                className="w-full font-semibold text-lg mb-4"
            />

            {["radio", "checkbox", "select"].includes(question.type) && (
                <div>
                    {question.options?.map((option, index) => (
                        <div key={index} className="flex justify-between">
                            <EditableContent
                                className="w-full mb-4"
                                placeholder="Opcion..."
                                value={option}
                                onChange={(value) => {
                                    const newOptions = [...question.options];
                                    newOptions[index] = value;
                                    updateField("options", newOptions);
                                }}
                            />

                            <button
                                className="hover:text-default-500"
                                onClick={() => deleteOption(index)}
                            >
                                <TrashIcon width={20} />
                            </button>
                        </div>
                    ))}

                    <Button
                        variant="bordered"
                        startContent={<PlusCircleIcon width={20} />}
                        onClick={addOption}
                    >
                        Agregar opción
                    </Button>
                </div>
            )}

            <div className="flex gap-5 justify-end">
                <Checkbox
                    isSelected={question.is_required}
                    onValueChange={(value) => updateField("is_required", value)}
                >
                    Obligatorio
                </Checkbox>

                <button
                    className="hover:text-default-500"
                    onClick={() => onDelete(question)}
                >
                    <TrashIcon width={20} />
                </button>
            </div>
        </>
    );
}
