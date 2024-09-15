import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { now, generateRandomEvents } from "./utils/calendar";
import { DayType, EventType, ViewModeTypes } from "./utils/types";

type ContexType = {
    now: DayType;
    day: DayType;
    setDay: React.Dispatch<React.SetStateAction<DayType>>;
    mode: ViewModeTypes;
    setMode: React.Dispatch<React.SetStateAction<"week" | "day">>;
    events: EventType[];

    eventDetail: React.ReactNode;
    selectedEvent: EventType | undefined;
    setSelectedEvent: React.Dispatch<
        React.SetStateAction<EventType | undefined>
    >;
};
const CalendarContext = createContext<ContexType>({} as ContexType);

export default function CalendarProvider({
    eventDetail,
    children,
}: {
    eventDetail: React.ReactNode;
    children: React.ReactNode;
}) {
    const [mode, setMode] = useState<ViewModeTypes>("week");
    const [current, setCurrent] = useState<DayType>(now());
    const [day, setDay] = useState<DayType>(current);
    const [selectedEvent, setSelectedEvent] = useState<EventType>();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(now());
        }, 60000); // 1 minute

        return () => clearInterval(interval);
    }, []);

    const events = useMemo(() => {
        return generateRandomEvents(day);
    }, [day]);

    return (
        <CalendarContext.Provider
            value={{
                day,
                setDay,
                mode,
                setMode,
                events,
                now: current,

                selectedEvent,
                setSelectedEvent,
                eventDetail,
            }}
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
