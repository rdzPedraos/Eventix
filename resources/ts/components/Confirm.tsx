import React, { cloneElement, useRef } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";

interface ConfirmWrapperProps {
    title?: string;
    text?: string;
    children: React.ReactElement;
}

export default function Confirm({
    title = "Confirmación",
    text = "¿Estás seguro de realizar esta acción?",
    children,
}: ConfirmWrapperProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const onClikRef = useRef(() => {});

    const handleConfirm = () => {
        onClikRef.current();
        onOpenChange();
    };

    const renderChild = (children) => {
        if (!children) return null;

        if (children.props.onClick) {
            onClikRef.current = children.props.onClick;

            return cloneElement(children, {
                onClick: (e) => {
                    e.preventDefault();
                    onOpen();
                },
            });
        }

        return cloneElement(children, {
            children: renderChild(children.props.children),
        });
    };

    return (
        <>
            {renderChild(children)}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {title}
                            </ModalHeader>
                            <ModalBody>
                                <p>{text}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Cancelar
                                </Button>

                                <Button color="primary" onPress={handleConfirm}>
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
