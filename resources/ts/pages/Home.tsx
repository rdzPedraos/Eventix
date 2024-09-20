import React, { useState } from "react";
import axios from "axios";
import { route } from "@ziggyjs";

import { Calendar, EventInfo, Head, Logo } from "@/components";
import { DayType, ViewModeTypes } from "@/components/Calendar/utils/types";
import days from "@/components/Calendar/utils/calendar";

export default function Home() {
    const [activities, setActivities] = useState([]);
    const onSearchEvents = async (day: DayType, mode: ViewModeTypes) => {
        return await axios
            .get(route("api.activities.index"), {
                params: {
                    date: day,
                    mode,
                },
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

                setActivities(dates);
            });
    };

    return (
        <>
            <Head title="Calendario" />

            <Calendar
                eventDetail={EventInfo}
                events={activities}
                onChangeEvents={onSearchEvents}
            />

            <div className="fixed bottom-2 right-6 z-50 opacity-40 pointer-events-none">
                <Logo onlyImage={true} />
            </div>
        </>
    );
}
