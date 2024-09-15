import React from "react";
import { useCalendarContext } from "../context";

import Header from "./Header";
import Week from "./Week";
import Day from "./Day";
import Modal from "./Modal";

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
