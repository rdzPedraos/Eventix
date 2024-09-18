import React, { useState } from "react";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";

import { RegisterType } from "@/hooks/useForm/types";
import OtpBox from "@/components/OtpBox";

type Props = {
    register: RegisterType;
    sendCode: () => Promise<boolean>;
    editable: boolean;
};

export default function Email({ register, sendCode, editable }: Props) {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        if (loading) return;

        setLoading(true);
        await sendCode();
        setLoading(false);
    };

    return (
        <>
            <p className="mb-4 text-gray-500">
                Para verificar que el correo electrónico es tuyo, ingresa y
                copia el código que te hemos enviado.
                <span>
                    Si no llegó, puedes solicitar otro haciendo
                    <span
                        className="ml-2 text-primary hover:underline cursor-pointer"
                        onClick={onClick}
                    >
                        click aquí
                        <ArrowPathRoundedSquareIcon
                            width={20}
                            className={`inline-block ml-1 ${
                                loading ? "animate-spin" : ""
                            }`}
                        />
                    </span>
                </span>
            </p>

            <div className="flex items-center gap-2">
                <OtpBox {...register("otp")} disabled={editable} />
            </div>
        </>
    );
}
