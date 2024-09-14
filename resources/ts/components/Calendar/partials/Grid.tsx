import React from "react";
import Event from "./Event";

type Props = {
    day: Date;
    events: {
        id: string;
        title: string;
        color: string;
        startDate: Date;
        endDate: Date;
    }[];
};

const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
);

export default function Grid({ day, events }: Props) {
    const daysEvents = events
        .filter(
            (event) =>
                event.startDate.getDate() === day.getDate() &&
                event.startDate.getMonth() === day.getMonth() &&
                event.startDate.getFullYear() === day.getFullYear()
        )
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    const eventosRenderizados = [];

    daysEvents.forEach((event, eventoIndex) => {
        const horaInicio = event.startDate.getHours();
        const minutoInicio = event.startDate.getMinutes();
        const duracionMinutos =
            (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60);

        const topPercentage = ((horaInicio + minutoInicio / 60) / 24) * 100;
        const heightPercentage = (duracionMinutos / (24 * 60)) * 100;

        // Calcular la posición horizontal y el ancho del evento
        const eventosSuperpuestos = eventosRenderizados.filter(
            ({ position: p }) =>
                (p.top < topPercentage + heightPercentage &&
                    topPercentage < p.top + p.height) ||
                (topPercentage < p.top + p.height &&
                    p.top < topPercentage + heightPercentage)
        );

        const leftPercentage = eventosSuperpuestos.length * 10; // 10% de margen para cada evento superpuesto
        const widthPercentage = 100 - leftPercentage; // El ancho siempre llega al borde derecho

        eventosRenderizados.push({
            ...event,
            zIndex: 10 + eventoIndex,
            position: {
                top: topPercentage,
                left: leftPercentage,
                width: widthPercentage,
                height: heightPercentage,
            },
        });
    });

    return (
        <div className="border-r border-gray-200 relative">
            {horas.map((hora) => (
                <div
                    key={hora}
                    className="h-16 border-b border-gray-200 relative"
                ></div>
            ))}

            {eventosRenderizados.map((props, id) => (
                <Event key={id} {...props} />
            ))}
        </div>
    );
}
