import React from "react";
import { route } from "@ziggyjs";
import { Head } from "@inertiajs/react";
import { Button, Input, Link } from "@nextui-org/react";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

import useForm from "@/hooks/useForm";
import GuestLayout from "@/Layout/GuestLayout";
import { Logo } from "@/components";

type ForgotFormFields = {
    email: string;
};

export default function Fotgot() {
    const { register, onSubmit } = useForm({} as ForgotFormFields);

    return (
        <>
            <Head title="Recuperar usuario" />

            <div className="h-full w-full max-w-xl mx-auto flex flex-col justify-center">
                <Logo size="sm" color="text-gray-700" />

                <Link href={route("login")} className="mt-2 mb-4 flex gap-1">
                    <ArrowLeftIcon width={20} />
                    Volver al inicio de sesión
                </Link>

                <p className="my-4 text-gray-500">
                    Si ingresas un correo valido, te enviaremos un enlace para
                    que puedas cambiar la contraseña 😉.
                </p>

                <form
                    onSubmit={onSubmit("post", route("password.request"))}
                    className="flex gap-4 items-start"
                >
                    <Input
                        type="email"
                        label="Correo electrónico"
                        color="primary"
                        size="lg"
                        isRequired
                        {...register("email")}
                    />

                    <Button
                        type="submit"
                        color="primary"
                        variant="ghost"
                        className="h-16 w-16"
                        isIconOnly
                    >
                        <PaperAirplaneIcon width={25} />
                    </Button>
                </form>
            </div>
        </>
    );
}

Fotgot.layout = (children) => <GuestLayout children={children} />;
