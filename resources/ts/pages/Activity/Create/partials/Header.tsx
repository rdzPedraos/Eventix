import React from "react";
import { Button } from "@nextui-org/react";
import { InboxIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

import { Container } from "@/components";
import { useActivityCreateContext } from "../context";

export default function Header() {
    const { save, publish, activity } = useActivityCreateContext();
    const isPublished = activity?.isPublished;

    return (
        <Container>
            <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between mb-4">
                <h1 className="text-2xl font-bold">Formulario</h1>

                <div className="flex justify-end gap-4">
                    <Button
                        variant="flat"
                        color="primary"
                        onClick={save}
                        endContent={<InboxIcon width={20} />}
                    >
                        {isPublished ? "Guardar cambios" : "Guardar borrador"}
                    </Button>

                    {!isPublished && (
                        <Button
                            variant="ghost"
                            color="success"
                            onClick={publish}
                            endContent={<PaperAirplaneIcon width={20} />}
                        >
                            Publicar
                        </Button>
                    )}
                </div>
            </div>

            <p className="text-default-600 mb-4">
                Este es el formulario para gestionar tus actividades 📅. Podrás
                guardar cambios cuantas veces quieras haciendo clic en
                <b className="ml-1">"guardar cambios"</b>.
                {!isPublished && (
                    <span className="ml-1">
                        Cuando hayas finalizado tus ajustes, haz click en el
                        botón
                        <b className="ml-1">"publicar"</b> y la actividad será
                        visible para todo el mundo 🌍!
                    </span>
                )}
            </p>
        </Container>
    );
}
