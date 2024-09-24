import React, { createContext, useContext } from "react";
import { usePage } from "@inertiajs/react";

import { ActivityResource } from "@/types/resources";
import { useHook } from "./hook";

type ActivityCreateContextType = ReturnType<typeof useHook> & {
    activity: ActivityResource;
};

const ActivityCreateContext = createContext<ActivityCreateContextType>(
    {} as ActivityCreateContextType
);

export default function ActivityCreateProvider({ children }) {
    const { activity } = usePage<{
        activity: ActivityResource;
    }>().props;

    const data = useHook(activity);

    return (
        <ActivityCreateContext.Provider value={{ activity, ...data }}>
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
