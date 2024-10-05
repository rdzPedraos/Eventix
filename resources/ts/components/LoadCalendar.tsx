import React, { useEffect, useState } from "react";
import axios from "axios";
import { route } from "@ziggyjs";

import { eventDetailType, EventType } from "./Calendar/utils/types";

import useForm from "@/hooks/useForm";
import { createDay } from "./Calendar/utils/calendar";
import { CalendarProvider, Calendar } from "./Calendar";
import CalendarSideBar, { FilterProps } from "./CalendarSideBar";

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
    const filterForm = useForm<FilterProps>({} as FilterProps);

    const onSearchEvents = (filters: object) => {
        axios
            .get(route("events.index"), {
                params: {
                    except: exceptActivityId,
                    ...filters,
                    ...filterForm.data,
                },
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
            sideBar={<CalendarSideBar form={filterForm} />}
        >
            <Calendar />
        </CalendarProvider>
    );
}
