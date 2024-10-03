import ErrorLayout from "@/Layout/ErrorLayout";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "@nextui-org/react";
import React, { Children } from "react";

type Props = {};

export default function index({}: Props) {
    return (
        <div className="max-w-sm">
            <h1 className="font-bold text-7xl mb-2 text-primary">404</h1>
            <h3 className="text-xl uppercase mb-4">
                Oops! Pagina no encontrada
            </h3>
            <p className="mb-4">
                Lo sentimos pero la pagina que tu estás buscando no existe o ha
                sido removida.
            </p>

            <Link href="/" className="font-bold">
                <ArrowLongLeftIcon className="w-6 h-6 mr-2" />
                Regresar al inicio
            </Link>
        </div>
    );
}

index.layout = (page) => <ErrorLayout>{page}</ErrorLayout>;
