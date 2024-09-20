import React from "react";
import Calendar from "./partials";
import CalendarProvider from "./context";
import {
    DayType,
    eventDetailType,
    EventType,
    ViewModeTypes,
} from "./utils/types";

type Props = {
    eventDetail?: eventDetailType;
    events: EventType[];
    onChangeEvents: (day: DayType, mode: ViewModeTypes) => void;
};

export default function index(props: Props) {
    return (
        <CalendarProvider {...props}>
            <Calendar />
        </CalendarProvider>
    );
}
