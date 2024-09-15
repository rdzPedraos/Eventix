import { Dayjs } from "dayjs";

export type DayType = Dayjs;

export type ViewModeTypes = "week" | "day";

export type EventType = {
    id: string;
    title: string;
    description: string;
    color: string;
    startDate: DayType;
    endDate: DayType;
};
