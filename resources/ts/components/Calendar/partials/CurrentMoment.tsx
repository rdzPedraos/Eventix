import React, { useMemo } from "react";

import { useCalendarContext } from "../CalendarContext";
import { DayType, ViewModeTypes } from "../utils/types";

type Props = {};

const getPosition = (current: DayType, mode: ViewModeTypes) => {
    switch (mode) {
        case "week":
            return {
                top: `${(current.get("hour") + current.get("minutes") / 60) * 3}rem`,
                width: `${100 / 7}%`,
                left: `${current.get("day") * (100 / 7)}%`,
            };

        case "day":
            return {
                top: `${(current.get("hour") + current.get("minutes") / 60) * 3}rem`,
                width: "100%",
                left: 0,
            };
    }
};

const isCurrent = (current: DayType, day: DayType, mode: ViewModeTypes) => {
    switch (mode) {
        case "week":
            return day.isSame(current, "week");
        default:
            return day.isSame(current, "day");
    }
};

export default function CurrentMoment({}: Props) {
    const { now, filters } = useCalendarContext();
    const position = useMemo(
        () => getPosition(now, filters.mode),
        [now, filters.mode]
    );

    if (!isCurrent(now, filters.day, filters.mode)) {
        return;
    }

    return (
        <div
            className="absolute left-0 right-0 border-t-2 border-red-500 z-30 pointer-events-none"
            style={position}
        >
            <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-500 rounded-full" />
        </div>
    );
}
