import React from "react";
import { route } from "@ziggyjs";
import { Head, usePage } from "@inertiajs/react";
import { Button } from "@nextui-org/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import useForm from "@/hooks/useForm";
import GuestLayout from "@/Layout/GuestLayout";
import { Logo, PasswordInput } from "@/components";

type ResetFormFields = {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
};

export default function Fotgot() {
    const { email, token } = usePage().props;
    const { register, onSubmit } = useForm({ email, token } as ResetFormFields);

    return (
        <>
            <Head title="Recuperar usuario" />

            <div className="h-full w-full max-w-xl mx-auto flex flex-col justify-center">
                <Logo size="sm" color="text-gray-700" />

                <p className="my-4 text-gray-500">
                    Ingresa una nueva contraseña.
                </p>

                <form
                    onSubmit={onSubmit("post", route("password.update"))}
                    className="flex flex-col gap-4"
                >
                    <PasswordInput
                        type="password"
                        label="Nueva contraseña"
                        color="primary"
                        size="lg"
                        isRequired
                        {...register("password")}
                    />

                    <PasswordInput
                        type="password"
                        label="Confirmar contraseña"
                        color="primary"
                        size="lg"
                        isRequired
                        {...register("password_confirmation")}
                    />

                    <Button
                        type="submit"
                        color="primary"
                        variant="shadow"
                        className="flex ml-auto"
                        size="lg"
                    >
                        Actualizar
                        <PaperAirplaneIcon width={20} />
                    </Button>
                </form>
            </div>
        </>
    );
}

Fotgot.layout = (children) => <GuestLayout children={children} />;
