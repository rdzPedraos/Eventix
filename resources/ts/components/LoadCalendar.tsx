import React, { useState } from "react";
import axios from "axios";
import { route } from "@ziggyjs";

import {
    DayType,
    eventDetailType,
    ViewModeTypes,
} from "./Calendar/utils/types";
import { CalendarProvider, Calendar } from "./Calendar";
import days from "./Calendar/utils/calendar";

type Props = {
    eventDetail?: eventDetailType;
};

export default function LoadCalendar({}: Props) {
    const [events, setEvents] = useState([]);

    const onSearchEvents = (day: DayType, mode: ViewModeTypes) => {
        console.log({ day });
        axios
            .get(route("api.activities.index"), {
                params: { day, mode },
            })
            .then(({ data }) => {
                const dates = data.map(
                    ({ id, activity, start_date, end_date }) => ({
                        id: id,
                        title: activity.name,
                        description: activity.description,
                        color: activity.color,
                        startDate: days(start_date),
                        endDate: days(end_date),
                    })
                );

                setEvents(dates);
            });
    };

    return (
        <CalendarProvider events={events} onChangeEvents={onSearchEvents}>
            <Calendar />;
        </CalendarProvider>
    );
}
