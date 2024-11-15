import React from "react";
import { useCalendarContext } from "../";
import { EventType } from "../utils/types";

const getCustomStyle = (defaultColor: string, style?: "dashed") => {
    return style === "dashed"
        ? {
              background: `repeating-linear-gradient(135deg, #fff, #fff 10px, ${defaultColor} 10px, ${defaultColor} 20px)`,
              opacity: 0.8,
          }
        : {
              backgroundColor: defaultColor,
              color: "#fff",
          };
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
    const shortEvent = minutes <= 60;

    const onClick = () => setSelectedEvent(event);

    return (
        <div
            className="absolute pb-1 pr-3 min-h-[25px] select-none"
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
                className={`w-full h-full py-1 px-2 rounded-md text-xs border-1 border-white shadow-sm cursor-pointer transition-all hover:shadow-lg`}
            >
                {shortEvent ? (
                    <div className="my-auto truncate text-[12px]">
                        <b>{title}, </b>
                        {startDate.format("HH:mm")}
                    </div>
                ) : (
                    <>
                        <div className="font-semibold truncate">{title}</div>
                        {`${startDate.format("HH:mm")} - ${endDate.format("HH:mm")}`}
                    </>
                )}
            </div>
        </div>
    );
}
