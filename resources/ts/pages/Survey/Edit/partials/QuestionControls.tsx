import React from "react";
import { route } from "@ziggyjs";
import { router } from "@inertiajs/react";
import { Button } from "@nextui-org/react";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/solid";

import { useFormCreateContext } from "../context";
import Confirm from "@/components/Confirm";

export default function QuestionControls() {
    const { onSubmit, survey } = useFormCreateContext();

    const onSave = (params = {}) => {
        if (survey.id) {
            return onSubmit(
                "put",
                route("surveys.update", { survey, ...params })
            )();
        }

        return onSubmit("post", route("surveys.store", params))();
    };

    const onPublish = () => onSave({ publish: true });

    const onDelete = () => {
        router.delete(
            route("surveys.destroy", {
                survey,
            })
        );
    };

    return (
        <div className="flex gap-2 justify-end">
            {survey?.id && (
                <Confirm title="Eliminar actividad" confirmColor="danger">
                    <Button color="danger" variant="flat" onClick={onDelete}>
                        <TrashIcon width={20} />
                    </Button>
                </Confirm>
            )}

            <Button variant="flat" color="primary" onClick={() => onSave()}>
                Guardar
            </Button>

            {survey?.id && (
                <Confirm
                    title="Publicar encuesta"
                    text="Una vez publicado, la encuesta quedará programada y no permitiá nuevos ajustes, sólo podrá cancelarla en el futuro."
                >
                    <Button
                        variant="ghost"
                        color="primary"
                        onClick={onPublish}
                        endContent={<PaperAirplaneIcon width={20} />}
                    >
                        Publicar
                    </Button>
                </Confirm>
            )}
        </div>
    );
}
