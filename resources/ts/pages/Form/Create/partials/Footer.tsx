import React from "react";
import { useFormCreateContext } from "../context";
import { Button } from "@nextui-org/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type Props = {};

export default function Footer({}: Props) {
    const { addQuestion } = useFormCreateContext();
    return (
        <Button onClick={addQuestion} className="w-full">
            <PlusCircleIcon className="w-4 h-4 mr-2" />
            Agregar pregunta
        </Button>
    );
}
