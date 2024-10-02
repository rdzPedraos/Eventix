import { Dayjs } from "dayjs";
import { ReactElement } from "react";

export type DayType = Dayjs;

export type ViewModeTypes = "week" | "day";

export type EventType = {
    id: string;
    title: string;
    description: string;
    color: string;
    startDate: DayType;
    endDate: DayType;
    style?: "dashed";

    activity_id?: number;
    alreadyEnrolled?: boolean;
};

export type eventDetailType = (props: {
    event: EventType;
    onClose: () => void;
}) => ReactElement;
