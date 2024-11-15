import React from "react";
import { route } from "@ziggyjs";
import { Container } from "@/components";
import BasicForm from "./partials/BasicForm";

type Props = {};

export default function Edit({}: Props) {
    return (
        <Container>
            <BasicForm />
        </Container>
    );
}

Edit.breadcrumb = {
    current: "Configuración de usuario",
    items: [{ to: route("home"), label: "Calendario" }],
};
