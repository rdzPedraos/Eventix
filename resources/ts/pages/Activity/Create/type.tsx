import { Scheduler } from "@/types/models";

export type ActivityCreateFormFields = {
    name: String;
    description: String;
    image: string;
    color: String;
    schedulers: Scheduler[];
};
