import React, { useState } from "react";
import axios from "axios";
import { route } from "@ziggyjs";

import {
    DayType,
    eventDetailType,
    EventType,
    ViewModeTypes,
} from "./Calendar/utils/types";
import { CalendarProvider, Calendar } from "./Calendar";
import { createDay } from "./Calendar/utils/calendar";

type Props = {
    eventDetail?: eventDetailType;
    staticEvents?: EventType[];
};

export default function LoadCalendar({ staticEvents = [] }: Props) {
    const [events, setEvents] = useState<EventType[]>([]);

    const onSearchEvents = (day: DayType, mode: ViewModeTypes) => {
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
                        startDate: createDay(start_date),
                        endDate: createDay(end_date),
                    })
                );

                setEvents(dates);
            });
    };

    return (
        <CalendarProvider
            events={[...events, ...staticEvents]}
            onChangeEvents={onSearchEvents}
        >
            <Calendar />;
        </CalendarProvider>
    );
}
