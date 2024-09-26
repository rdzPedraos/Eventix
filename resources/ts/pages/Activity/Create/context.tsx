import React, { createContext, useContext } from "react";
import { usePage } from "@inertiajs/react";

import { ActivityResource, SiteResource } from "@/types/resources";
import { useHook } from "./hook";

type ActivityCreateContextType = ReturnType<typeof useHook> & {
    activity: ActivityResource;
    sites: SiteResource[];
};

const ActivityCreateContext = createContext<ActivityCreateContextType>(
    {} as ActivityCreateContextType
);

export default function ActivityCreateProvider({ children }) {
    const { activity, sites } = usePage<{
        activity: ActivityResource;
        sites: SiteResource[];
    }>().props;

    const data = useHook(activity);

    return (
        <ActivityCreateContext.Provider value={{ sites, activity, ...data }}>
            {children}
        </ActivityCreateContext.Provider>
    );
}

export function useActivityCreateContext() {
    const context = useContext(ActivityCreateContext);

    if (Object.keys(context).length === 0) {
        throw new Error(
            "useActivityCreateContext must be used within a useActivityCreateContext"
        );
    }

    return context;
}
