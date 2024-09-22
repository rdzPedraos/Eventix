import React from "react";
import { useCalendarContext } from "./CalendarContext";

import Header from "./partials/Header";
import Week from "./partials/Week";
import Day from "./partials/Day";
import Modal from "./partials/Modal";

function render() {
    const { mode } = useCalendarContext();

    switch (mode) {
        case "week":
            return <Week />;

        case "day":
            return <Day />;

        default:
            throw new Error("Invalid type");
    }
}

export default function Calendar() {
    return (
        <div className="h-full w-full bg-white flex flex-col">
            <Header />
            {render()}
            <Modal />
        </div>
    );
}
