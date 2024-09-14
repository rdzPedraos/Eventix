import React, { createContext, useContext, useMemo, useState } from "react";
import { Day, now } from "./utils";
import generateRandomEvents from "./hook";

type ModeTypes = "week" | "day";

type ContexType = {
    day: Day;
    setDay: React.Dispatch<React.SetStateAction<Day>>;
    mode: ModeTypes;
    setMode: React.Dispatch<React.SetStateAction<"week" | "day">>;
    events: {
        id: string;
        title: string;
        color: string;
        startDate: Day;
        endDate: Day;
    }[];
};
const CalendarContext = createContext<ContexType>({} as ContexType);

export default function CalendarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mode, setMode] = useState<ModeTypes>("week");
    const [day, setDay] = useState<Day>(now);

    const events = useMemo(() => {
        return generateRandomEvents(day);
    }, [day]);

    return (
        <CalendarContext.Provider
            value={{ day, setDay, mode, setMode, events }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendarContext() {
    const context = useContext(CalendarContext);

    if (Object.keys(context).length === 0) {
        throw new Error(
            "useCalendarContext must be used within a CalendarProvider"
        );
    }

    return context;
}
