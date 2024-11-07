import React from "react";
import Event from "./Event";
import { hours } from "../utils/calendar";
import { DayType, EventType } from "../utils/types";

type Props = {
    day: DayType;
    events: EventType[];
};

const halfHourInPercentage = (0.5 / 24) * 100;
const hourInPercentage = (1 / 24) * 100;

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
        if (bottom - top < halfHourInPercentage) bottom = halfHourInPercentage;

        // Check if there are events superposed
        const eventosSuperpuestos = eventosRenderizados.filter(
            ({ position: p }) => !(p.bottom <= top || p.top >= bottom)
        );

        const closerEvent = eventosSuperpuestos.reduce(
            (prev, current) =>
                top - current.position.top < top - prev.position.top
                    ? current
                    : prev,
            eventosSuperpuestos[0]
        );

        let left = 0;
        let width = 100;

        if (closerEvent && top - closerEvent.position.top < hourInPercentage) {
            left = closerEvent.position.left + closerEvent.position.width / 2;
            width = closerEvent.position.width / 2;
        } else {
            left = eventosSuperpuestos.length * 5; // 5% de margen para cada evento superpuesto
            width -= left; // El ancho siempre llega al borde derecho
        }

        //reduce previous events width
        eventosSuperpuestos.forEach((evento) => {
            evento.position.width -= 5;
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
