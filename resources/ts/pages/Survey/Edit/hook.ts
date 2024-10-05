import useForm from "@/hooks/useForm";
import { Question, Survey } from "@/types/models";
import { useState } from "react";

export default function useFormBuilder(survey: Survey = {} as Survey) {
    const [editMode, setEditMode] = useState(null);
    const { data, setData, errors, register, onSubmit } = useForm<Survey>({
        ...survey,
    } as Survey);

    const addQuestion = () => {
        const questions = [...(data?.questions ?? [])];
        const size = questions.length + 1;

        const newQuestion = {
            id: Math.floor(Math.random() * 1000),
            label: "Pregunta " + size,
            type: "text",
            is_required: true,
        } as unknown as Question;

        questions.push(newQuestion);
        setData("questions", questions);
        setEditMode(newQuestion.id);
    };

    const onDeleteQuestion = (question: Question) => {
        const index = data.questions.findIndex((q) => q.id === question.id);
        const newQuestions = [...data.questions];
        newQuestions.splice(index, 1);
        setData("questions", newQuestions);
    };

    const onUpdateQuestion = (question) => {
        const index = data.questions.findIndex((q) => q.id === question.id);
        const newQuestions = [...data.questions];
        newQuestions[index] = question;
        setData("questions", newQuestions);
    };

    const isInEditMode = (question: Question) => editMode === question.id;
    const changeEditMode = (question?: Question) => setEditMode(question?.id);

    const onReorderQuestions = (questions: Question[]) => {
        setData("questions", questions);
    };

    return {
        data,
        setData,
        errors,
        register,

        addQuestion,
        onDeleteQuestion,
        onUpdateQuestion,

        isInEditMode,
        changeEditMode,

        onReorderQuestions,
        onSubmit,
    };
}
