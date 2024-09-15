import React from "react";
import { EventType } from "./Calendar/utils/types";
import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";

type Props = {
    event: EventType;
    onClose: () => void;
};

export default function EventInfo({ event, onClose }: Props) {
    const { title, startDate, description } = event;

    return (
        <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                <p>
                    <strong>Fecha:</strong> {startDate.format("DD/MM/YYYY")}
                </p>
                <p>
                    <strong>Hora:</strong> {startDate.format("HH:mm")}
                </p>
                <p>
                    <strong>Descripción:</strong> {description}
                </p>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
        </>
    );
}
