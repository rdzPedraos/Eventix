import React from "react";

import { Link } from "@inertiajs/react";
import { route } from "@ziggyjs";

import { Button, Checkbox, Input } from "@nextui-org/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import useForm from "@/hooks/useForm";
import GuestLayout from "@/Layout/GuestLayout";
import { Head, Logo, PasswordInput } from "@/components";

type Props = {};

export default function Login({}: Props) {
    const { register, onSubmit } = useForm({} as LoginFormFields);

    return (
        <>
            <Head title="Login" />

            <div className="h-full w-full max-w-xl mx-auto flex flex-col justify-center">
                <Logo size="sm" color="text-gray-700" />

                <p className="my-4 text-gray-500">
                    Ingresa algún correo electrónico vinculado a tu cuenta y la
                    contraseña para acceder.
                </p>

                <form onSubmit={onSubmit("post", "login")}>
                    <div className="flex flex-col gap-4 mb-8">
                        <Input
                            {...register("email")}
                            type="email"
                            label="Correo electrónico"
                            variant="underlined"
                            size="sm"
                            color="primary"
                            isRequired
                        />

                        <PasswordInput
                            {...register("password")}
                            label="Password"
                            variant="underlined"
                            size="sm"
                            color="primary"
                            isRequired
                        />

                        <div className="flex justify-between">
                            <Checkbox
                                {...register("remember", "checkbox")}
                                className="text-default-300"
                            >
                                Mantener sesión activa
                            </Checkbox>

                            <Link
                                href="#"
                                className="text-primary hover:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>

                    <Button
                        variant="shadow"
                        color="primary"
                        type="submit"
                        className="flex ml-auto"
                        endContent={<ArrowRightIcon height={20} width={20} />}
                    >
                        Iniciar sesión
                    </Button>
                </form>

                <Link
                    href={route("register.index")}
                    className="absolute bottom-10 left-0 right-0 text-center text-default-500 hover:underline"
                >
                    ¿No tienes cuenta? <strong>Regístrate</strong>
                </Link>
            </div>
        </>
    );
}

Login.layout = (children) => <GuestLayout children={children} />;
