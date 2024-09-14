import React from "react";
import { hours } from "../utils";

type Props = {};

export default function Hours({}: Props) {
    return (
        <div className="bg-white sticky left-0 z-20 border-r border-gray-200 w-16">
            {hours.map((hour) => (
                <div key={hour.toString()} className="h-16 relative">
                    <span className="absolute -top-4 w-full px-2 py-2 text-center text-xs text-gray-500 bg-white">
                        {hour.get("hour") > 0 && hour.format("HH:mm")}
                    </span>
                </div>
            ))}
        </div>
    );
}
