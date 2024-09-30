import React, { useState } from "react";
import { useFormCreateContext } from "../context";
import { Question } from "@/types/models";

import { Container } from "@/components";

import QuestionEditor from "./QuestionEditor";
import QuestionPreview from "./QuestionPreview";
import { Button } from "@nextui-org/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type Props = {};

export default function ListQuestions({}: Props) {
    const { data, setData } = useFormCreateContext();
    const [modeEdit, setModeEdit] = useState(null);

    const onUpdateQuestion = (question) => {
        const index = data.questions.findIndex((q) => q.id === question.id);
        console.log(question, index);
        const newQuestions = [...data.questions];
        newQuestions[index] = question;
        setData("questions", newQuestions);
    };

    const addQuestion = () => {
        const size = data.questions.length + 1;
        const newQuestion = {
            id: Math.floor(Math.random() * 1000),
            label: "Pregunta " + size,
            order: size + 1,
            type: "text",
        } as Question;

        setData("questions", [...data.questions, newQuestion]);
        setModeEdit(newQuestion.id);
    };

    const onDeleteQuestion = (question: Question) => {
        const index = data.questions.findIndex((q) => q.id === question.id);
        const newQuestions = [...data.questions];
        newQuestions.splice(index, 1);
        setData("questions", newQuestions);
    };

    return (
        <>
            {data.questions.map((question) => (
                <Container key={question.id}>
                    {modeEdit === question.id ? (
                        <QuestionEditor
                            question={question}
                            onUpdate={onUpdateQuestion}
                            onDelete={onDeleteQuestion}
                        />
                    ) : (
                        <QuestionPreview
                            question={question}
                            activeModeEdit={(id) => setModeEdit(id)}
                        />
                    )}
                </Container>
            ))}

            <Button
                onClick={addQuestion}
                color="primary"
                startContent={<PlusCircleIcon width={20} />}
            >
                Agregar pregunta
            </Button>
        </>
    );
}
