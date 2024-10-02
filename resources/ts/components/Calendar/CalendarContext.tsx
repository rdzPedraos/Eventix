import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

import { now } from "./utils/calendar";

import {
    DayType,
    eventDetailType,
    EventType,
    ViewModeTypes,
} from "./utils/types";

type ContexType = {
    now: DayType;
    day: DayType;
    setDay: Dispatch<SetStateAction<DayType>>;
    mode: ViewModeTypes;
    setMode: Dispatch<SetStateAction<ViewModeTypes>>;
    events: EventType[];

    eventDetail: eventDetailType;
    selectedEvent: EventType;
    setSelectedEvent: Dispatch<SetStateAction<EventType>>;

    forceUpdate: () => void;
};

const CalendarContext = createContext<ContexType>({} as ContexType);

type CalendarProviderProps = {
    children: ReactNode;
    eventDetail?: eventDetailType;
    events: EventType[];
    onChangeEvents: (day: DayType, mode: ViewModeTypes) => void;
};

export default function CalendarProvider({
    children,
    eventDetail,
    events,
    onChangeEvents,
}: CalendarProviderProps) {
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

    useEffect(() => {
        forceUpdate();
    }, [day, mode]);

    const forceUpdate = () => {
        onChangeEvents(day, mode);
        setSelectedEvent(undefined);
    };

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

                forceUpdate,
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
