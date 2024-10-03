import React from "react";
import { route } from "@ziggyjs";
import { Breadcrumb, Container } from "@/components";
import BasicForm from "./partials/BasicForm";

type Props = {};

export default function Edit({}: Props) {
    return (
        <>
            <Breadcrumb
                current="Configuración de usuario"
                items={[{ label: "Calendario", to: route("home") }]}
            />

            <Container>
                <BasicForm />
            </Container>
        </>
    );
}
