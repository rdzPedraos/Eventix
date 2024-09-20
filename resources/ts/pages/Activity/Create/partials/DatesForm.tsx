import React from "react";
import { Calendar, Container } from "@/components";

type Props = {};

export default function DatesForm({}: Props) {
    return (
        <Container>
            <h2 className="text-2xl mb-4">Cronograma</h2>
            <p className="mb-4">
                Aqui puedes agregar tantas reuniones desees 😉! Además, puedes
                ir previsualiando tu calendario 📆
            </p>

            <Calendar />
        </Container>
    );
}
