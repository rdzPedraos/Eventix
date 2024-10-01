import React from "react";
import { Button } from "@nextui-org/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useFormCreateContext } from "../context";
import { route } from "@ziggyjs";

export default function QuestionControls() {
    const { submit, survey } = useFormCreateContext();

    const onSave = (params = {}) => {
        submit("put", route("surveys.update", { survey, ...params }));
    };

    const onPublish = () => onSave({ publish: true });

    return (
        <div className="flex gap-2 justify-end">
            <Button variant="flat" color="primary" onClick={() => onSave()}>
                Guardar
            </Button>

            <Button
                variant="ghost"
                color="primary"
                onClick={onPublish}
                endContent={<PaperAirplaneIcon width={20} />}
            >
                Publicar
            </Button>
        </div>
    );
}
