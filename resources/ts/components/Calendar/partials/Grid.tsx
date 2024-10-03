import React from "react";
import Event from "./Event";
import { hours } from "../utils/calendar";
import { DayType } from "../utils/types";

type Props = {
    day: DayType;
    events: {
        id: string;
        title: string;
        color: string;
        startDate: DayType;
        endDate: DayType;
    }[];
};

export default function Grid({ day, events }: Props) {
    const daysEvents = events
        .filter(
            (event) => event.startDate.isSame(day, "day") //|| event.endDate.isSame(day, "day")
        )
        .sort((a, b) => a.startDate.diff(b.startDate));

    const eventosRenderizados = [];

    daysEvents.forEach((event, eventoIndex) => {
        const startHour =
            event.startDate.get("hour") + event.startDate.get("minute") / 60;

        const endHour =
            event.endDate.get("hour") + event.endDate.get("minute") / 60;

        const top = (startHour / 24) * 100;
        let bottom = (endHour / 24) * 100;
        if (bottom - top < 1) bottom += 1; // Minimum height of 1%

        // Calcular la posición horizontal y el ancho del evento
        const eventosSuperpuestos = eventosRenderizados.filter(
            ({ position: p }) => top >= p.top && top < p.bottom
        );

        const left = eventosSuperpuestos.length * 10; // 10% de margen para cada evento superpuesto
        const width = 100 - left; // El ancho siempre llega al borde derecho

        //reduce previous events width
        eventosSuperpuestos.forEach((evento) => {
            evento.position.width -= 10;
        });

        eventosRenderizados.push({
            ...event,
            zIndex: 10 + eventoIndex,
            position: {
                top,
                left,
                bottom,
                width,
            },
        });
    });

    return (
        <div className="border-r border-gray-200 relative">
            {hours.map((hour) => (
                <div
                    key={hour.valueOf()}
                    className="h-12 border-b border-gray-200 relative"
                ></div>
            ))}

            {eventosRenderizados.map((props, id) => (
                <Event key={id} {...props} />
            ))}
        </div>
    );
}
