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
    FilterProps,
    onChangeEventsType,
} from "./utils/types";

type ContexType = {
    now: DayType;
    events: EventType[];

    filters: FilterProps;
    setFilter: (
        filter: keyof FilterProps,
        value: FilterProps[keyof FilterProps]
    ) => void;

    eventDetail: eventDetailType;
    selectedEvent: EventType;
    setSelectedEvent: Dispatch<SetStateAction<EventType>>;

    forceUpdate: () => void;

    sideBar?: React.ReactNode;
    openSidebar: boolean;
    toggleSideBar: Dispatch<SetStateAction<boolean>>;
};

const CalendarContext = createContext<ContexType>({} as ContexType);

type CalendarProviderProps = {
    children: ReactNode;
    eventDetail?: eventDetailType;
    events: EventType[];
    onChangeEvents: onChangeEventsType;
    sideBar?: React.ReactNode;
};

export default function CalendarProvider({
    children,
    eventDetail,
    events,
    onChangeEvents,
    sideBar,
}: CalendarProviderProps) {
    const [current, setCurrent] = useState<DayType>(now());
    const [selectedEvent, setSelectedEvent] = useState<EventType>();
    const [openSidebar, toggleSideBar] = useState<boolean>(true);

    const [filters, setFilters] = useState({
        day: current,
        mode: "week",
    } as FilterProps);

    const setFilter = (
        filter: keyof FilterProps,
        value: FilterProps[keyof FilterProps]
    ) => {
        setFilters((prev) => ({ ...prev, [filter]: value }));
    };

    const forceUpdate = () => {
        onChangeEvents(filters);
        setSelectedEvent(undefined);
    };

    useEffect(() => {
        forceUpdate();
    }, [filters]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(now());
        }, 60000); // 1 minute

        return () => clearInterval(interval);
    }, []);

    return (
        <CalendarContext.Provider
            value={{
                events,
                now: current,

                filters,
                setFilter,

                selectedEvent,
                setSelectedEvent,
                eventDetail,

                forceUpdate,

                sideBar,
                openSidebar,
                toggleSideBar,
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
