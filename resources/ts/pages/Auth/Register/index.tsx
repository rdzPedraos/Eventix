import React from "react";

import { Link } from "@inertiajs/react";
import { route } from "@ziggyjs";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import AuthLayout from "@/Layout/AuthLayout";
import { Head, Logo } from "@/components";
import Form from "./partials/Form";

type Props = {};

export default function Register({}: Props) {
    return (
        <>
            <Head title="Registro" />

            <div className="w-full max-w-xl mx-auto">
                <Logo size="sm" color="text-gray-700" />

                <Link
                    href={route("login")}
                    className="mt-2 mb-8 flex gap-1 text-primary-500 hover:text-primary-600"
                >
                    <ArrowLeftIcon width={20} />
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>

                <Form />
            </div>
        </>
    );
}

Register.layout = (children) => <AuthLayout children={children} />;
