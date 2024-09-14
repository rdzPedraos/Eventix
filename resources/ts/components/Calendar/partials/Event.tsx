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
    id,
    title,
    description,
    color,
    startDate,
    endDate,
    zIndex,
    position,
}: Props) {
    const { setSelectedEvent } = useCalendarContext();
    const minutes = endDate.diff(startDate, "minute");
    const shortEvent = minutes <= 40;

    const onClick = () =>
        setSelectedEvent({ id, title, color, startDate, endDate, description });

    return (
        <div
            className="absolute pb-[4px] pr-[4px] min-h-[25px]"
            style={{
                zIndex,
                top: `${position.top}%`,
                left: `${position.left}%`,
                bottom: `${100 - position.bottom}%`,
                width: `${position.width}%`,
            }}
            onClick={onClick}
        >
            <div
                className={`w-full h-full py-[2px] px-1 rounded-sm overflow-hidden text-xs ${color} border shadow-sm cursor-pointer transition-all hover:shadow-md`}
            >
                {shortEvent ? (
                    <div className="my-auto truncate text-[12px]">
                        <b>{title}, </b>
                        {startDate.format("HH:mm")}
                    </div>
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
