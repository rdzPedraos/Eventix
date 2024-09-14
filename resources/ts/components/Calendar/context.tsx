import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Day, now, generateRandomEvents } from "./utils";

type ModeTypes = "week" | "day";

type EventType = {
    id: string;
    title: string;
    description: string;
    color: string;
    startDate: Day;
    endDate: Day;
};

type ContexType = {
    now: Day;
    day: Day;
    setDay: React.Dispatch<React.SetStateAction<Day>>;
    mode: ModeTypes;
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
    children,
}: {
    children: React.ReactNode;
}) {
    const [mode, setMode] = useState<ModeTypes>("day");
    const [current, setCurrent] = useState<Day>(now());
    const [day, setDay] = useState<Day>(current);
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
