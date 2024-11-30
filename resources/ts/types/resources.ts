import { Scheduler } from "./models";

export type ActivityListResource = {
    id: number;
    name: string;
    description: string | null;
    is_closed: boolean;
    status: {
        color: "success" | "danger" | "default";
        label: string;
    };
    color: string;
    created_at: string | null;
    updated_at: string | null;
    created_by: number;
    image: string | null;
    enrollments: number;
    is_owner: boolean;
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
    surveys_number: number;
    is_owner: boolean;
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
    answers_count: number;
    trigger: {
        label: string;
        date: string;
    };
    published_at: string;
    status: {
        color: "success" | "danger" | "default";
        label: string;
        key: "published" | "closed" | "blocked" | "draft";
    };
    activity: {
        id: number;
        name: string;
    };
};

export type UserResource = {
    id: number;
    name: string;
    email: string;
    document: string;
    document_type: string;
    phone: string;
    address: string;
    roles: string[];
};
