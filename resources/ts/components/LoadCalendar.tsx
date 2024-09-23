import React, { useEffect, useState } from "react";
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
    exceptActivityId?: number;
};

export default function LoadCalendar({
    staticEvents = [],
    exceptActivityId,
}: Props) {
    const [events, setEvents] = useState<EventType[]>([]);

    const onSearchEvents = (day: DayType, mode: ViewModeTypes) => {
        axios
            .get(route("api.activities.index"), {
                params: { day, mode, except: exceptActivityId },
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

                setEvents([...dates, ...staticEvents]);
            });
    };

    useEffect(() => {
        setEvents((prevEvents) => {
            const newEvents = staticEvents.filter(
                (staticEvent) =>
                    !prevEvents.some((event) => event.id === staticEvent.id)
            );

            return [...prevEvents, ...newEvents];
        });
    }, [staticEvents]);

    return (
        <CalendarProvider events={events} onChangeEvents={onSearchEvents}>
            <Calendar />;
        </CalendarProvider>
    );
}
