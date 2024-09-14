import React from "react";
import Week from "./Week";
import { useCalendarContext } from "../context";

export default function Calendar() {
    const { mode } = useCalendarContext();

    switch (mode) {
        case "week":
            return <Week />;
        default:
            throw new Error("Invalid type");
    }
}
