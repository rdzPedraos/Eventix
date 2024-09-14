import React from "react";

type Props = {
    title: string;
    color: string;
    startDate: Date;
    endDate: Date;
    zIndex: number;
    position: {
        top: number;
        left: number;
        width: number;
        height: number;
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
    const minutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
    const shortEvent = minutes <= 30;

    return (
        <div
            className="absolute pb-[4px] pr-[4px] min-h-[30px]"
            style={{
                zIndex,
                top: `${position.top}%`,
                left: `${position.left}%`,
                height: `${position.height}%`,
                width: `${position.width}%`,
            }}
            /*onClick={() => setEventoSeleccionado(evento)}*/
        >
            <div
                className={`w-full h-full p-1 rounded-sm overflow-hidden text-xs ${color} border shadow-sm cursor-pointer transition-all hover:shadow-md`}
            >
                {shortEvent ? (
                    <span className="truncate">
                        <b>{title}, </b> {startDate.getHours()}:
                        {startDate.getMinutes().toString().padStart(2, "0")}
                    </span>
                ) : (
                    <>
                        <div className="font-semibold truncate">{title}</div>
                        <div className="flex gap-1">
                            <span>
                                {startDate.getHours()}:
                                {endDate
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0")}
                            </span>
                            -
                            <span>
                                {endDate.getHours()}:
                                {endDate
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0")}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
