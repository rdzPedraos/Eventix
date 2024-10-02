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
    eventDetail,
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
                const dates = data.map(({ activity, ...sc }) => ({
                    id: sc.id,
                    title: activity.name,
                    description: activity.description,
                    color: activity.color,
                    startDate: createDay(sc.start_date),
                    endDate: createDay(sc.end_date),

                    activity_id: activity.id,
                    alreadyEnrolled: sc.already_enrolled,
                }));

                setEventsSearched(dates);
            });
    };

    useEffect(() => {
        setEvents([...eventsSearched, ...(staticEvents ?? [])]);
    }, [staticEvents, eventsSearched]);

    return (
        <CalendarProvider
            eventDetail={eventDetail}
            events={events}
            onChangeEvents={onSearchEvents}
        >
            <Calendar />
        </CalendarProvider>
    );
}
