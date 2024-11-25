import React, { createContext, useContext } from "react";
import { usePage } from "@inertiajs/react";

import { ActivityResource, SiteResource } from "@/types/resources";
import { useHook } from "./hook";
import { ColorEnum } from "@/types/models";

type ActivityCreateContextType = ReturnType<typeof useHook> & {
    colors: ColorEnum[];
    activity: ActivityResource;
    sites: SiteResource[];
};

const ActivityCreateContext = createContext<ActivityCreateContextType>(
    {} as ActivityCreateContextType
);

export default function ActivityCreateProvider({ children }) {
    const props = usePage<{
        activity: ActivityResource;
        sites: SiteResource[];
        colors: ColorEnum[];
    }>().props;

    const data = useHook(props.activity);

    return (
        <ActivityCreateContext.Provider value={{ ...props, ...data }}>
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
