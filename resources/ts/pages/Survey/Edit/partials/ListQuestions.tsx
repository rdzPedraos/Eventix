import React, { useState } from "react";
import { useFormCreateContext } from "../context";
import { Question } from "@/types/models";

import { Container } from "@/components";

import QuestionEdit from "./QuestionEdit";
import QuestionPreview from "./QuestionPreview";

type Props = {};

export default function ListQuestions({}: Props) {
    const { data, setData } = useFormCreateContext();
    const [modeEdit, setModeEdit] = useState(data.questions[0].id);

    const onUpdate = (index: number) => {
        return (question: Question) => {
            const newQuestions = [...data.questions];
            newQuestions[index] = question;
            setData("questions", newQuestions);
        };
    };

    return (
        <>
            {data.questions.map((question, index) => (
                <Container key={question.id}>
                    {modeEdit === question.id ? (
                        <QuestionEdit
                            question={question}
                            onUpdate={onUpdate(index)}
                        />
                    ) : (
                        <QuestionPreview question={question} />
                    )}
                </Container>
            ))}
        </>
    );
}
