import React from "react";
import { useFormCreateContext } from "../context";
import { Container, EditableContent } from "@/components";

type Props = {};

export default function Header({}: Props) {
    const { register } = useFormCreateContext();

    return (
        <Container>
            <EditableContent
                {...register("name", "editable_content")}
                className="text-2xl font-bold w-full mb-4"
                placeholder="Título del formulario"
            />

            <EditableContent
                {...register("description", "editable_content")}
                className="text-gray-600 w-full"
                placeholder="Descripción del formulario"
            />
        </Container>
    );
}
