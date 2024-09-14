import { hours, now } from "@/utils/CalendarUtils";
import { Dayjs } from "dayjs";
import React from "react";

type Props = {
    day?: Dayjs;
};

export default function Day({ day = now }: Props) {
    return (
        <div className="flex flex-col">
            <div>
                <span>{day.format("dddd")}</span>
                <span>{day.format("DD")}</span>
            </div>

            <div className="grid grid-rows-24 border-b-2"></div>
        </div>
    );
}
