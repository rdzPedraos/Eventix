import React, { useEffect, useRef } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";
import { Button } from "@nextui-org/react";

import { useFormCreateContext } from "../context";
import { Container } from "@/components";
import QuestionEditor from "./QuestionEditor";
import QuestionPreview from "./QuestionPreview";

export default function QuestionList() {
    const {
        data,
        onReorderQuestions,
        addQuestion,
        changeEditMode,
        isInEditMode,
    } = useFormCreateContext();

    const editingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!editingRef.current?.contains(event.target as Node)) {
                changeEditMode(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editingRef]);

    return (
        <>
            {data.questions && (
                <Reorder.Group
                    axis="y"
                    className="space-y-4"
                    values={data.questions}
                    onReorder={onReorderQuestions}
                >
                    {data.questions.map((question) => {
                        const editMode = isInEditMode(question);

                        return (
                            <Reorder.Item key={question.id} value={question}>
                                <Container
                                    className={
                                        editMode
                                            ? "ring-2 ring-primary-300"
                                            : ""
                                    }
                                >
                                    {editMode ? (
                                        <div ref={editingRef}>
                                            <QuestionEditor
                                                question={question}
                                            />
                                        </div>
                                    ) : (
                                        <QuestionPreview question={question} />
                                    )}
                                </Container>
                            </Reorder.Item>
                        );
                    })}
                </Reorder.Group>
            )}

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
