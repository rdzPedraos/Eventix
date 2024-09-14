import React, { useEffect, useMemo, useState } from "react";

import { Day, now } from "../utils";
import { useCalendarContext } from "../context";

type Props = {};

const getPosition = (current: Day, mode: "week" | "day") => {
    switch (mode) {
        case "week":
            return {
                top: `${(current.get("hour") + current.get("minutes") / 60) * 4}rem`,
                width: `${100 / 7}%`,
                left: `${current.get("day") * (100 / 7)}%`,
            };

        case "day":
            return {
                top: `${(current.get("hour") + current.get("minutes") / 60) * 4}rem`,
                width: "100%",
                left: 0,
            };
    }
};

const isCurrent = (current: Day, day: Day, mode: "week" | "day") => {
    switch (mode) {
        case "week":
            return day.isSame(current, "week");
        default:
            return day.isSame(current, "day");
    }
};

export default function CurrentMoment({}: Props) {
    const { now, day, mode } = useCalendarContext();
    const position = useMemo(() => getPosition(now, mode), [now, mode]);

    if (!isCurrent(now, day, mode)) {
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
