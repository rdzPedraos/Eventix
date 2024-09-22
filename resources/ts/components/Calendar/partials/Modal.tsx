import React from "react";

import {
    Button,
    Modal as ModalComponent,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useCalendarContext } from "../";

type Props = {};

export default function Modal({}: Props) {
    const { selectedEvent, setSelectedEvent, eventDetail } =
        useCalendarContext();

    if (eventDetail === undefined) return null;

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
                {(onClose) => eventDetail({ event: selectedEvent, onClose })}
            </ModalContent>
        </ModalComponent>
    );
}
