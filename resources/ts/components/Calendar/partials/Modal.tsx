import React from "react";

import {
    Button,
    Modal as ModalComponent,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useCalendarContext } from "../context";

type Props = {};

export default function Modal({}: Props) {
    const { selectedEvent, setSelectedEvent } = useCalendarContext();

    const onOpenChange = (open: boolean) => {
        if (!open) setSelectedEvent(undefined);
    };
    return (
        <ModalComponent
            backdrop="blur"
            isOpen={!!selectedEvent}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{selectedEvent.title}</ModalHeader>
                        <ModalBody>
                            <p>
                                <strong>Fecha:</strong>{" "}
                                {selectedEvent.startDate.format("DD/MM/YYYY")}
                            </p>
                            <p>
                                <strong>Hora:</strong>{" "}
                                {selectedEvent.startDate.format("HH:mm")}
                            </p>
                            <p>
                                <strong>Descripción:</strong>{" "}
                                {selectedEvent.description}
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </ModalComponent>
    );
}
