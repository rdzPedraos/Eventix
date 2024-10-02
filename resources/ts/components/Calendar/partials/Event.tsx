import React from "react";
import { useCalendarContext } from "../";
import { EventType } from "../utils/types";

const getCustomStyle = (defaultColor: string, style: string) => {
    if (style === "dashed") {
        return {
            background: `repeating-linear-gradient(45deg, #fffa, #fff9 10px, ${defaultColor} 10px, ${defaultColor} 20px)`,
        };
    }

    return { backgroundColor: defaultColor };
};

type Props = EventType & {
    zIndex: number;
    position: {
        top: number;
        bottom: number;
        left: number;
        width: number;
    };
};

export default function Event({ zIndex, position, style, ...event }: Props) {
    const { setSelectedEvent } = useCalendarContext();
    const { title, color, startDate, endDate } = event;
    const minutes = endDate.diff(startDate, "minute");
    const shortEvent = minutes <= 40;

    const onClick = () => setSelectedEvent(event);

    return (
        <div
            className="absolute pb-[4px] pr-[4px] min-h-[25px] select-none"
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
                style={getCustomStyle(color, style)}
                className={`w-full h-full py-[2px] px-1 rounded-sm overflow-hidden text-xs border-1 border-opacity-20 border-black shadow-sm cursor-pointer transition-all hover:shadow-md`}
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
