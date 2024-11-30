import React from "react";

type Props = {};

export default function Header({}: Props) {
    return (
        <div>
            <h1 className="text-2xl font-bold text-default-900 mb-4">
                Equipo de trabajo
            </h1>

            <p>
                Agrega otros usuarios que consideres que deben hacer parte de la
                actividad, estos podrán realizar todas las acciones como crear
                encuesta, publicar actividades, generar reportes, etc
            </p>
        </div>
    );
}
