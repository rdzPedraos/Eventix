import React from "react";
import { useCalendarContext } from "./CalendarContext";

import Header from "./partials/Header";
import Week from "./partials/Week";
import Day from "./partials/Day";
import Modal from "./partials/Modal";
import { Sidebar } from "react-pro-sidebar";

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

function renderSideBar() {
    const { sideBar, openSidebar, toggleSideBar } = useCalendarContext();

    if (!sideBar) {
        return null;
    }

    return (
        <Sidebar
            collapsed={!openSidebar}
            collapsedWidth="0"
            onBackdropClick={() => toggleSideBar(false)}
            className="h-full"
        >
            {sideBar}
        </Sidebar>
    );
}

export default function Calendar() {
    return (
        <div className="h-full w-full bg-white flex flex-col">
            <Header />

            <div className="flex">
                {renderSideBar()}
                {render()}
            </div>

            <Modal />
        </div>
    );
}
