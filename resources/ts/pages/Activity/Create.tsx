import React, { useEffect } from "react";
import { route } from "@ziggyjs";
import {
    ArrowUpTrayIcon,
    InboxIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

import useForm from "@/hooks/useForm";
import { PastelColors } from "@/utils/Colors";
import { Breadcrumb, Container } from "@/components";

type Props = {};

function renderColorItem(color: (typeof PastelColors)[0]) {
    return (
        <div
            key={color}
            className="w-5 h-5 rounded-full mr-2 border-1 border-opacity-20 border-black"
            style={{ background: color }}
        />
    );
}

export default function Create({}: Props) {
    const { register, submit, setData, errors } = useForm(
        {} as ActivityCreateFormFields
    );

    useEffect(() => {
        const random = Math.floor(Math.random() * PastelColors.length);
        setData("color", PastelColors[random]);
    }, []);

    const onSubmit = (action) => {
        return () =>
            submit("post", route("activities.store", { action }), {
                preserveState: true,
            });
    };

    return (
        <>
            <Breadcrumb
                current="Nueva actividad"
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("activities.index"), label: "Actividades" },
                ]}
            />

            <Container>
                <h1 className="text-3xl mb-4">Formulario</h1>
                <p className="text-default-600 mb-4">
                    A continuación ingrese la información que será usada para
                    crear la actividad. Mientras la actividad no se posicione en
                    "publicada" no será visible para los usuarios.
                </p>

                <form className="flex flex-col gap-4">
                    <div className="flex justify-start gap-4">
                        <Select
                            aria-label="Color"
                            className="w-20 h-auto"
                            {...register("color", "select")}
                            renderValue={(selected) => [
                                renderColorItem(selected[0].textValue),
                            ]}
                        >
                            {PastelColors.map((color) => (
                                <SelectItem key={color} textValue={color}>
                                    {renderColorItem(color)}
                                </SelectItem>
                            ))}
                        </Select>

                        <Button
                            variant="flat"
                            color="secondary"
                            startContent={<ArrowUpTrayIcon width={20} />}
                        >
                            Subir foto (opcional)
                        </Button>
                    </div>

                    {errors.color && (
                        <span className="text-danger">{errors.color}</span>
                    )}
                    {errors.image && (
                        <span className="text-danger">{errors.image}</span>
                    )}

                    <Input
                        label="Nombre de la actividad"
                        size="lg"
                        isRequired
                        {...register("name")}
                    />

                    <Textarea
                        label="Descripción"
                        size="lg"
                        {...register("description")}
                    />

                    <div className="absolute top-5 right-5 flex justify-end gap-4">
                        <Button
                            variant="flat"
                            color="primary"
                            onClick={onSubmit("save")}
                            endContent={<InboxIcon width={20} />}
                        >
                            Guardar cambios
                        </Button>

                        <Button
                            variant="ghost"
                            color="success"
                            onClick={onSubmit("publish")}
                            endContent={<PaperAirplaneIcon width={20} />}
                        >
                            Publicar
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    );
}
