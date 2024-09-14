import React, { useEffect, useState } from "react";
import { Day, now } from "../utils";

type Props = {
    week: Day;
};

export default function CurrentMoment({ week }: Props) {
    const [current, setCurrent] = useState(now());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(() => now());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="absolute left-0 right-0 border-t-2 border-red-500 z-30 pointer-events-none"
            style={{
                top: `${(current.get("hour") + current.get("minutes") / 60) * 4}rem`,
                width: `${100 / 7 - 1}%`,
                left: `${((current.get("day") - week.get("day") + 7) % 7) * (100 / 7) + 2}%`,
            }}
        >
            <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-500 rounded-full" />
        </div>
    );
}
