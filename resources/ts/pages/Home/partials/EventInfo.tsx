import React from "react";
import { EventType } from "../../../components/Calendar/utils/types";
import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";

type Props = {
    event: EventType;
    onClose: () => void;
};

export default function EventInfo({ event, onClose }: Props) {
    const { title, startDate, endDate, description } = event;

    return (
        <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                <p>
                    <strong>Fecha:</strong> {startDate.format("DD/MM/YYYY")}
                </p>
                <p>
                    <strong>Hora inicio:</strong> {startDate.format("HH:mm")}
                </p>
                <p>
                    <strong>Hora cierre:</strong> {endDate.format("HH:mm")}
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
