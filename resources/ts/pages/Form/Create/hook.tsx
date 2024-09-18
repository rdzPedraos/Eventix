import { Question } from "@/components/Form/utils/types";
import { useState } from "react";

export default function useFormBuilder() {
    const [formTitle, setFormTitle] = useState("Título del formulario");
    const [formDescription, setFormDescription] = useState(
        "Descripción del formulario"
    );

    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            text: "Pregunta sin título",
            description: "",
            options: ["Opción 1"],
            isRequired: false,
            type: "text",
        },
    ]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const addQuestion = () => {
        const newQuestion: Question = {
            id: questions.length + 1,
            text: "Nueva pregunta",
            description: "",
            options: ["Opción 1"],
            isRequired: false,
            type: "text",
        };
        setQuestions([...questions, newQuestion]);
    };

    const updateQuestion = (id: number, updates: Partial<Question>) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
        );
    };

    const deleteQuestion = (id: number, event: React.MouseEvent) => {
        event.stopPropagation();
        setQuestions(questions.filter((q) => q.id !== id));
        setEditingId(null);
    };

    const addOption = (questionId: number) => {
        const question = questions.find((q) => q.id === questionId);
        if (question) {
            const newOptions = [
                ...question.options,
                `Opción ${question.options.length + 1}`,
            ];
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const updateOption = (questionId: number, index: number, value: string) => {
        const question = questions.find((q) => q.id === questionId);
        if (question) {
            const newOptions = [...question.options];
            newOptions[index] = value;
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const deleteOption = (questionId: number, index: number) => {
        const question = questions.find((q) => q.id === questionId);
        if (question) {
            const newOptions = question.options.filter((_, i) => i !== index);
            updateQuestion(questionId, { options: newOptions });
        }
    };

    return {
        formTitle,
        formDescription,
        setFormTitle,
        setFormDescription,

        editingId,
        setEditingId,

        questions,
        addQuestion,
        updateQuestion,
        setQuestions,
        deleteQuestion,

        addOption,
        updateOption,
        deleteOption,
    };
}
