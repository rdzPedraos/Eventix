import React, { ReactElement } from "react";
import Calendar from "./partials";
import CalendarProvider from "./context";
import { eventDetailType } from "./utils/types";

type Props = {
    eventDetail: eventDetailType;
};

export default function index(props: Props) {
    return (
        <CalendarProvider {...props}>
            <Calendar />
        </CalendarProvider>
    );
}
