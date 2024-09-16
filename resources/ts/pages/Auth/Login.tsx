import React, { useState } from "react";
import { useForm } from "@/hooks/useForm";
import { Button, Checkbox, Input } from "@nextui-org/react";
import AuthLayout from "@/Layout/AuthLayout";
import { Head, Logo } from "@/components";
import {
    ArrowRightIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

type Props = {};

export default function Login({}: Props) {
    const { register, onSubmit, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <Head title="Login" />

            <div className="w-full max-w-xl">
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

                        <Input
                            {...register("password")}
                            type={isVisible ? "text" : "password"}
                            label="Password"
                            variant="underlined"
                            size="sm"
                            color="primary"
                            isRequired
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? (
                                        <EyeSlashIcon
                                            height={20}
                                            width={20}
                                            className="text-2xl text-default-400 pointer-events-none"
                                        />
                                    ) : (
                                        <EyeIcon
                                            height={20}
                                            width={20}
                                            className="text-2xl text-default-400 pointer-events-none"
                                        />
                                    )}
                                </button>
                            }
                        />

                        <div className="flex justify-between">
                            <Checkbox
                                {...register("remember", "checkbox")}
                                className="text-default-300"
                            >
                                Mantener sesión activa
                            </Checkbox>

                            <Link
                                href="/password/reset"
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
                    href="/register"
                    className="absolute bottom-10 left-0 right-0 text-center text-default-500 hover:underline"
                >
                    ¿No tienes cuenta? <strong>Regístrate</strong>
                </Link>
            </div>
        </>
    );
}

Login.layout = (children) => <AuthLayout children={children} />;
