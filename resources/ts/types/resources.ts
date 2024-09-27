import { Scheduler } from "./models";

export type ActivityListResource = {
    id: number;
    name: string;
    description: string | null;
    status: {
        color:
            | "success"
            | "danger"
            | "warning"
            | "default"
            | "primary"
            | "secondary";
        label: string;
        isClosed: boolean;
        isPublished: boolean;
    };
    color: string;
    created_at: string | null;
    updated_at: string | null;
    created_by: number;
    image: string | null;
    editable: boolean;
};

export type ActivityResource = {
    id: number;
    name: string;
    description: string | null;
    isPublished: boolean;
    color: string;
    image: string | null;
    created_at: string | null;
    updated_at: string | null;
    created_by: number;
    schedulers: Scheduler[];
};

export type SchedulerResource = {
    id: number;
    start_date: string;
    end_date: string;
    site_id: number;
};

export type SiteResource = {
    id: number;
    name: string;
    address: string;
};

export type SurveyListResource = {
    id: number;
    name: string;
    description: string | null;
    published_trigger: "custom" | "start_at" | "end_at";
    trigger_date: Date;
};
