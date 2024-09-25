import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { Button, Input } from "@nextui-org/react";

import { BookmarkIcon } from "@heroicons/react/24/solid";
import { Sites } from "@/types/models";
import useForm from "@/hooks/useForm";
import { Breadcrumb, Container } from "@/components";

export default function index() {
    const { site } = usePage<{ site: Sites }>().props;
    const { register, submit } = useForm<Sites>(site || ({} as Sites));

    const onSubmit = (e) => {
        e.preventDefault();

        if (site) submit("put", route("sites.update", { site }));
        else submit("post", route("sites.store"));
    };

    return (
        <>
            <Breadcrumb
                current={site ? "Editar" : "Crear"}
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("sites.index"), label: "Espacios académicos" },
                ]}
            />

            <Container>
                <h1 className="text-2xl font-bold text-default-900 mb-4">
                    Formulario
                </h1>

                <p className="mb-4">
                    La información que ingreses aquí será visible para todos los
                    usuarios de la plataforma. Y serán relacionados con las
                    actividades que crees en el calendario 📆.
                </p>

                <form
                    onSubmit={onSubmit}
                    className="flex flex-col sm:flex-row gap-4 max-w-7xl"
                >
                    <Input
                        {...register("name")}
                        label="Nombre"
                        size="lg"
                        isRequired
                    />

                    <Input
                        {...register("address")}
                        label="Lugar"
                        size="lg"
                        isRequired
                    />

                    <Button
                        variant="flat"
                        color="primary"
                        type="submit"
                        className="absolute top-5 right-5"
                        endContent={<BookmarkIcon width={20} />}
                    >
                        Guardar
                    </Button>
                </form>
            </Container>
        </>
    );
}
