import React from "react";
import { useCalendarContext } from "../context";
import Hours from "./Hours";
import Grid from "./Grid";
import CurrentMoment from "./CurrentMoment";

type Props = {};

export default function Day({}: Props) {
    const { now, day, events } = useCalendarContext();
    const currentDay = day.isSame(now, "day");

    return (
        <div className="flex-grow flex flex-col overflow-hidden border border-gray-200 rounded-lg">
            {/* Dias */}
            <div
                className="grid grid-cols-[auto_1fr] border-b border-gray-200 pr-2 shadow"
                /*style={{ paddingRight: `${scrollbarWidth}px` }}*/
            >
                <div className="bg-white p-2 border-r border-gray-200 w-16"></div>
                <div
                    key={day.toString()}
                    className={`bg-white p-2 text-center border-r border-gray-200 ${currentDay ? "bg-blue-50" : ""}`}
                >
                    <span className="text-sm">{day.format("dddd")}</span>

                    <div
                        className={`text-xl ${currentDay ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""}`}
                    >
                        {day.format("D")}
                    </div>
                </div>
            </div>

            <div
                className="flex-grow overflow-y-auto"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(203, 213, 225, 0.7) transparent",
                }}
            >
                <div className="relative grid grid-cols-[auto_1fr]">
                    <Hours />

                    <Grid key={day.toString()} day={day} events={events} />

                    {/* Línea roja de hora actual */}
                    {<CurrentMoment />}
                </div>
            </div>
        </div>
    );
}
