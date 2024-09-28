import React from "react";
import { Question } from "@/types/models";
import { Container, EditableContent } from "@/components";

type Props = {
    question: Question;
    onUpdate: (question: Question) => void;
};

export default function QuestionEdit({ question, onUpdate }: Props) {
    const updateField = (field: string, value: string) => {
        onUpdate({ ...question, [field]: value });
    };

    return (
        <>
            <EditableContent
                value={question.label}
                onChange={(value) => updateField("label", value)}
                className="w-full font-bold text-lg"
            />
        </>
    );
}
