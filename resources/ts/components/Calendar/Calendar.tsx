import React from "react";
import { useCalendarContext } from "./CalendarContext";

import Header from "./partials/Header";
import Week from "./partials/Week";
import Day from "./partials/Day";
import Modal from "./partials/Modal";
import { Sidebar } from "react-pro-sidebar";

function render() {
    const { filters } = useCalendarContext();

    switch (filters.mode) {
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
            toggled={openSidebar}
            collapsedWidth="0"
            breakPoint="md"
            onBackdropClick={() => toggleSideBar(false)}
            className="bg-[#fcfcfc]"
        >
            {sideBar}
        </Sidebar>
    );
}

export default function Calendar() {
    return (
        <div className="w-full bg-white flex flex-col">
            <Header />

            <div className="flex">
                {renderSideBar()}
                {render()}
            </div>

            <Modal />
        </div>
    );
}
