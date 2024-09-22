import React from "react";
import { RegisterType } from "@/hooks/useForm";
import { PasswordInput } from "@/components";

type Props = {
    register: RegisterType<RegisterFormFields>;
};

export default function Password({ register }: Props) {
    return (
        <>
            <p className="mb-4 text-gray-500">
                Ingrese una contraseña segura para su cuenta. La contraseña debe
                tener al menos 8 caracteres.
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
