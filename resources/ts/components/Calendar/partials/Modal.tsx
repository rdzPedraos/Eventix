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
    const { selectedEvent, setSelectedEvent, eventDetail, forceUpdate } =
        useCalendarContext();

    if (eventDetail === undefined) return null;

    const onOpenChange = (open: boolean) => {
        if (!open) setSelectedEvent(undefined);
    };
    return (
        <ModalComponent isOpen={!!selectedEvent} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) =>
                    eventDetail({ event: selectedEvent, onClose, forceUpdate })
                }
            </ModalContent>
        </ModalComponent>
    );
}
