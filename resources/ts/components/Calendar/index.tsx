import React from "react";
import Calendar from "./partials";
import CalendarProvider from "./context";

type Props = {};

export default function index({}: Props) {
    return (
        <CalendarProvider>
            <Calendar />
        </CalendarProvider>
    );
}
