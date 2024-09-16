import QuestionBuilder from "@/components/Form/QuestionBuilder";
import QuestionPreview from "@/components/Form/QuestionPreview";
import { Question, QuestionItemProps } from "@/components/Form/utils/types";
import React, { useEffect, useRef } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { useFormCreateContext } from "../context";

export default function QuestionList() {
    const {
        questions,
        setQuestions,
        deleteQuestion,
        editingId,
        setEditingId,
        updateQuestion,
        addOption,
        deleteOption,
        updateOption,
    } = useFormCreateContext();
    const editingRef = useRef<HTMLDivElement>(null);

    const handleEditClick = (event: React.MouseEvent, id: number) => {
        event.stopPropagation();
        setEditingId(id);
    };

    const closeEditMode = () => {
        setEditingId(null);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                editingRef.current &&
                !editingRef.current.contains(event.target as Node)
            ) {
                setEditingId(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Reorder.Group
            axis="y"
            values={questions}
            onReorder={setQuestions}
            className="space-y-4"
        >
            {questions.map((question) => (
                <QuestionItem
                    key={question.id}
                    question={question}
                    isEditing={editingId === question.id}
                    onEdit={(e) => handleEditClick(e, question.id)}
                    onDelete={(e) => deleteQuestion(question.id, e)}
                    renderContent={() =>
                        editingId === question.id ? (
                            <QuestionBuilder
                                question={question}
                                deleteQuestion={deleteQuestion}
                                updateQuestion={updateQuestion}
                                addOption={addOption}
                                updateOption={updateOption}
                                deleteOption={deleteOption}
                            />
                        ) : (
                            <QuestionPreview
                                question={question}
                                handleEditClick={handleEditClick}
                            />
                        )
                    }
                    closeEditMode={closeEditMode}
                    editingRef={editingId === question.id ? editingRef : null}
                />
            ))}
        </Reorder.Group>
    );
}

function QuestionItem({
    question,
    isEditing,
    renderContent,
    closeEditMode,
    editingRef,
}: QuestionItemProps) {
    const controls = useDragControls();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                isEditing &&
                editingRef &&
                editingRef.current &&
                !editingRef.current.contains(event.target as Node)
            ) {
                closeEditMode();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing, closeEditMode, editingRef]);

    return (
        <Reorder.Item
            value={question}
            id={question.id.toString()}
            dragControls={controls}
            dragListener={false}
        >
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Card
                    className={`w-full relative ${isEditing ? "ring-2 ring-blue-500" : ""}`}
                >
                    <div
                        className="absolute top-0 left-0 right-0 h-8 cursor-move bg-gray-100 rounded-t-lg flex items-center justify-center"
                        onPointerDown={(e) => controls.start(e)}
                    >
                        <CursorArrowRaysIcon className="text-gray-400 w-4 h-4" />
                    </div>
                    <div ref={editingRef}>
                        <CardBody className="pt-10 w-full">
                            {renderContent()}
                        </CardBody>
                    </div>
                </Card>
            </motion.div>
        </Reorder.Item>
    );
}
