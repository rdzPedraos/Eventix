import React from "react";
import { Day } from "../utils";

type Props = {
    title: string;
    color: string;
    startDate: Day;
    endDate: Day;
    zIndex: number;
    position: {
        top: number;
        bottom: number;
        left: number;
        width: number;
    };
};

export default function Event({
    title,
    color,
    startDate,
    endDate,
    zIndex,
    position,
}: Props) {
    const minutes = endDate.diff(startDate, "minute");
    const shortEvent = minutes <= 40;

    return (
        <div
            className="absolute pb-[4px] pr-[4px] min-h-[30px]"
            style={{
                zIndex,
                top: `${position.top}%`,
                left: `${position.left}%`,
                bottom: `${100 - position.bottom}%`,
                width: `${position.width}%`,
            }}
            /*onClick={() => setEventoSeleccionado(evento)}*/
        >
            <div
                className={`w-full h-full p-1 rounded-sm overflow-hidden text-xs ${color} border shadow-sm cursor-pointer transition-all hover:shadow-md`}
            >
                {shortEvent ? (
                    <span className="truncate">
                        <b>{title}, </b> {startDate.format("HH:mm")}
                    </span>
                ) : (
                    <>
                        <div className="font-semibold truncate">{title}</div>
                        <span>
                            {`${startDate.format("HH:mm")} - ${endDate.format("HH:mm")}`}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
