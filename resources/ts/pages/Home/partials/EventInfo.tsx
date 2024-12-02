import React from "react";
import { EventType } from "@/components/Calendar/utils/types";
import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Link, router, usePage } from "@inertiajs/react";
import { route } from "@ziggyjs";
import { triggerAlert, triggerConfetti } from "@/utils";

type Props = {
    event: EventType;
    onClose: () => void;
    forceUpdate: () => void;
};

export default function EventInfo({ event, forceUpdate }: Props) {
    const { auth } = usePage<PageProps>().props;
    const {
        title,
        description,
        alreadyEnrolled,
        activity_id: activity,
    } = event;

    const onSubscribe = () => {
        triggerAlert(
            (resolve, reject) => {
                router.post(route("events.subscribe", { activity }), null, {
                    onSuccess: () => {
                        triggerConfetti();
                        forceUpdate();
                    },
                    onError: reject,
                    onFinish: resolve,
                });
            },
            { success: "Inscrito correctamente" }
        );
    };

    const onUnsubscribe = () => {
        triggerAlert(
            (resolve, reject) => {
                router.post(route("events.unsubscribe", { activity }), null, {
                    onSuccess: forceUpdate,
                    onError: reject,
                    onFinish: resolve,
                });
            },
            { success: "Inscripción cancelada" }
        );
    };

    return (
        <>
            <ModalHeader>
                <p className="text-xl font-bold text-wrap">{title}</p>
            </ModalHeader>

            <ModalBody>
                <p className="text-default-800">{description}</p>
            </ModalBody>

            <ModalFooter>
                {auth.user ? (
                    alreadyEnrolled ? (
                        <Button
                            variant="ghost"
                            color="danger"
                            onClick={onUnsubscribe}
                        >
                            Cancelar inscripción
                        </Button>
                    ) : (
                        <Button
                            variant="shadow"
                            color="primary"
                            onClick={onSubscribe}
                            endContent={<PaperAirplaneIcon width={20} />}
                        >
                            Inscribirme
                        </Button>
                    )
                ) : (
                    <Button
                        as={Link}
                        href={route("login")}
                        color="primary"
                        variant="flat"
                    >
                        Inicia sesión para inscribirte
                    </Button>
                )}
            </ModalFooter>
        </>
    );
}
