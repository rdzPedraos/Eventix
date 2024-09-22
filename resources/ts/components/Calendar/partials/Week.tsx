import React, { useMemo } from "react";

import { useCalendarContext } from "../";
import { getWeekDays } from "../utils/calendar";

import Grid from "./Grid";
import Hours from "./Hours";
import CurrentMoment from "./CurrentMoment";

type Props = {};

export default function Week({}: Props) {
    const { now, day, events } = useCalendarContext();
    const weekDays = useMemo(() => getWeekDays(day), [day]);

    return (
        <div className="flex-grow flex flex-col overflow-hidden border border-gray-200 rounded-lg">
            {/* Dias */}
            <div className="grid grid-cols-[auto_1fr] border-b border-gray-200">
                <div className="bg-white p-2 border-r border-gray-200 w-16"></div>
                <div className="grid grid-cols-7">
                    {weekDays.map((day) => {
                        const currentDay = day.isSame(now, "day");
                        return (
                            <div
                                key={day.toString()}
                                className={`bg-white p-2 text-center border-r border-gray-200 ${currentDay ? "bg-blue-50" : ""}`}
                            >
                                <span className="text-sm">
                                    {day.format("dddd")}
                                </span>

                                <div
                                    className={`text-xl ${currentDay ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""}`}
                                >
                                    {day.format("D")}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div
                className="flex-grow overflow-y-auto"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(203, 213, 225, 0.7) transparent",
                }}
            >
                <div className="grid grid-cols-[auto_1fr]">
                    <Hours />

                    <div className="relative grid grid-cols-7">
                        {weekDays.map((day) => (
                            <Grid
                                key={day.toString()}
                                day={day}
                                events={events}
                            />
                        ))}

                        {/* Línea roja de hora actual */}
                        {<CurrentMoment />}
                    </div>
                </div>
            </div>
        </div>
    );
}
