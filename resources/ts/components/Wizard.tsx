import {
    ArrowLeftIcon,
    ArrowRightIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
    steps: {
        title: string;
        Component: React.ReactNode;
        icon?: React.ReactNode;

        onNext?: () => boolean | Promise<boolean>;
        onPrev?: () => boolean;
    }[];

    onSubmit: () => void;
};

export default function Wizard({ steps, onSubmit }: Props) {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(null);
    const current = steps[step];

    const prev = async () => {
        setLoading("prev");

        const onPrev = current.onPrev;
        if (!onPrev || (await onPrev())) {
            setStep((step) => --step);
        }

        setLoading(null);
    };

    const next = async () => {
        setLoading("next");

        const onNext = current.onNext;
        if (!onNext || (await onNext())) {
            setStep((step) => ++step);
        }

        setLoading(null);
    };

    const submit = async () => {
        setLoading("submit");
        await onSubmit();
        setLoading(null);
    };

    return (
        <>
            {steps && (
                <nav>
                    <ul className="flex gap-4 mb-4 cursor-default">
                        {steps.map((s, i) => {
                            const active = i === step;

                            return (
                                <li
                                    key={i}
                                    className={
                                        active
                                            ? "text-primary text-sm"
                                            : "text-gray-400 text-sm"
                                    }
                                >
                                    <div className="flex items-center gap-1">
                                        {s.icon}
                                        <span>{s.title}</span>
                                    </div>
                                    {active && (
                                        <motion.div
                                            className="border-b-2 border-primary-300 mt-1"
                                            layoutId="wizard-underline"
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}

            {current.Component}

            <div className="flex flex-row-reverse justify-between mt-8 gap-4">
                {step + 1 < steps.length ? (
                    <Button
                        color="primary"
                        variant="shadow"
                        isLoading={loading === "next"}
                        onClick={next}
                        endContent={<ArrowRightIcon width={20} />}
                    >
                        Siguiente
                    </Button>
                ) : (
                    <Button
                        color="primary"
                        variant="shadow"
                        isLoading={loading === "submit"}
                        onClick={submit}
                        endContent={<PaperAirplaneIcon width={20} />}
                    >
                        Finalizar
                    </Button>
                )}

                {step > 0 && (
                    <Button
                        color="primary"
                        variant="flat"
                        isLoading={loading === "prev"}
                        onClick={prev}
                        startContent={<ArrowLeftIcon width={20} />}
                    >
                        Anterior
                    </Button>
                )}
            </div>
        </>
    );
}
