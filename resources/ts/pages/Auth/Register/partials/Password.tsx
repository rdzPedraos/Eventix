import React from "react";
import { RegisterType } from "@/hooks/useForm/types";
import { PasswordInput } from "@/components";

type Props = {
    register: RegisterType;
};

export default function Password({ register }: Props) {
    return (
        <>
            <p className="mb-4 text-gray-500">
                Ingrese una contraseña segura para su cuenta.
            </p>

            <div className="flex flex-col gap-4">
                <PasswordInput
                    {...register("password")}
                    label="Contraseña"
                    isRequired
                />

                <PasswordInput
                    {...register("verify_password")}
                    label="Nueva contraseña"
                    isRequired
                />
            </div>
        </>
    );
}
