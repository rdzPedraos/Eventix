import React from "react";
import { route } from "@ziggyjs";
import { useActivityCreateContext } from "../context";
import { LoadCalendar } from "@/components";

import Header from "./Header";
import BasicForm from "./BasicForm";
import DatesForm from "./DatesForm";

export default function CreateActivity() {
    const { activity, events } = useActivityCreateContext();

    return (
        <div className="flex flex-col gap-4">
            <Header />
            <BasicForm />
            <DatesForm />

            <div className="rounded-xl overflow-clip shadow">
                <LoadCalendar
                    staticEvents={events}
                    exceptActivityId={activity?.id}
                />
            </div>
        </div>
    );
}
