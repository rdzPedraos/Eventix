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
    staticEvents = null,
    exceptActivityId,
}: Props) {
    const [eventsSearched, setEventsSearched] = useState<EventType[]>([]);
    const [events, setEvents] = useState<EventType[]>([]);

    const onSearchEvents = (day: DayType, mode: ViewModeTypes) => {
        axios
            .get(route("events.index"), {
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

                setEventsSearched(dates);
            });
    };

    useEffect(() => {
        setEvents([...eventsSearched, ...(staticEvents ?? [])]);
    }, [staticEvents, eventsSearched]);

    return (
        <CalendarProvider events={events} onChangeEvents={onSearchEvents}>
            <Calendar />
        </CalendarProvider>
    );
}
