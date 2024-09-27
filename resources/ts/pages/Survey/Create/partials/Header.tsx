import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { useFormCreateContext } from "../context";

type Props = {};

export default function Header({}: Props) {
    const { formTitle, setFormTitle, formDescription, setFormDescription } =
        useFormCreateContext();

    return (
        <Card className="w-full">
            <CardBody>
                <input
                    id="form-title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="text-2xl font-bold w-full border-none focus:outline-none focus:ring-0 p-0"
                    placeholder="Título del formulario"
                />

                <input
                    id="form-description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="mt-2 text-gray-600 w-full border-none focus:outline-none focus:ring-0 p-0"
                    placeholder="Descripción del formulario"
                />
            </CardBody>
        </Card>
    );
}
