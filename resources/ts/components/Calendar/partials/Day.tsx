import { Day, now } from "../utils";
import React from "react";

type Props = {
    day?: Day;
};

export default function Day({ day = now() }: Props) {
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
