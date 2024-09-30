import React, { useEffect, useRef, useState } from "react";
import { useFormCreateContext } from "../context";
import { Question } from "@/types/models";

import { Container } from "@/components";

import QuestionEditor from "./QuestionEditor";
import QuestionPreview from "./QuestionPreview";
import { Button } from "@nextui-org/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";

type Props = {};

export default function QuestionList({}: Props) {
    const { data, setData } = useFormCreateContext();
    const [modeEdit, setModeEdit] = useState(null);
    const editingRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!editingRef.current?.contains(event.target as Node)) {
                setModeEdit(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editingRef]);

    return (
        <>
            <Reorder.Group
                axis="y"
                values={data.questions}
                onReorder={(questions) => setData("questions", questions)}
                className="space-y-4"
            >
                {data.questions.map((question) => (
                    <Reorder.Item key={question.id} value={question}>
                        <Container>
                            {modeEdit === question.id ? (
                                <div ref={editingRef}>
                                    <QuestionEditor
                                        question={question}
                                        onUpdate={onUpdateQuestion}
                                        onDelete={onDeleteQuestion}
                                    />
                                </div>
                            ) : (
                                <QuestionPreview
                                    question={question}
                                    activeModeEdit={(id) => setModeEdit(id)}
                                />
                            )}
                        </Container>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

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
