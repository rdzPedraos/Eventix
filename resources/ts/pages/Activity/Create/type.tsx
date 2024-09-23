import { Scheduler } from "@/types/models";

export type ActivityCreateFormFields = {
    name: string;
    description: string;
    image: string;
    color: string;
    schedulers: Scheduler[];
};
