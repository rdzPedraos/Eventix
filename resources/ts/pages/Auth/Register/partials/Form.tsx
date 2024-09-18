import React from "react";

import {
    FingerPrintIcon,
    ShieldCheckIcon,
    UserIcon,
} from "@heroicons/react/24/solid";

import hook from "../hook";
import { Wizard } from "@/components";
import Basic from "./Basic";
import Email from "./Email";
import Password from "./Password";

type Props = {};

export default function Form({}: Props) {
    const {
        data,
        onSubmit,
        otpStatus,
        register,
        sendOtp,
        verifyOtp,
        verifyPassword,
    } = hook();

    const steps = [
        {
            title: "Datos básicos",
            icon: <UserIcon width={20} />,
            Component: <Basic register={register} data={data} />,
            onNext: sendOtp,
        },
        {
            title: "Validar email",
            icon: <ShieldCheckIcon width={20} />,
            Component: (
                <Email
                    register={register}
                    sendCode={sendOtp}
                    editable={otpStatus == "verified"}
                />
            ),
            onNext: verifyOtp,
        },
        {
            title: "Contraseña",
            icon: <FingerPrintIcon width={20} />,
            Component: <Password register={register} />,
            onNext: verifyPassword,
        },
    ];

    return <Wizard steps={steps} onSubmit={onSubmit} />;
}