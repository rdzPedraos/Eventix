import React, { useEffect, useState } from "react";

type Props = {
    week: Date;
};

export default function CurrentMoment({ week }: Props) {
    const [current, setCurrent] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(() => new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="absolute left-0 right-0 border-t-2 border-red-500 z-30 pointer-events-none"
            style={{
                top: `${(current.getHours() + current.getMinutes() / 60) * 4}rem`,
                width: `${100 / 7 - 1}%`,
                left: `${((current.getDay() - week.getDay() + 7) % 7) * (100 / 7) + 2}%`,
            }}
        >
            <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-500 rounded-full" />
        </div>
    );
}
