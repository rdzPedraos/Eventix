import React, { createContext, useContext } from "react";
import { usePage } from "@inertiajs/react";

import { Activity, Survey } from "@/types/models";
import useFormBuilder from "./hook";

type ContextType = ReturnType<typeof useFormBuilder> & {
    questionTypes: { key: string; value: string }[];
    triggerTypes: { key: string; value: string }[];
    survey: Survey;
    activity: Activity;
};

const FormCreateContext = createContext<ContextType>({} as ContextType);

export default function FormCreateProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { survey, questionTypes, triggerTypes, activity } = usePage<{
        survey: Survey;
        activity: Activity;
        questionTypes: { key: string; value: string }[];
        triggerTypes: { key: string; value: string }[];
    }>().props;

    const data = useFormBuilder(survey);

    return (
        <FormCreateContext.Provider
            value={{ ...data, questionTypes, triggerTypes, survey, activity }}
        >
            {children}
        </FormCreateContext.Provider>
    );
}

export function useFormCreateContext() {
    const context = useContext(FormCreateContext);

    if (Object.keys(context).length === 0) {
        throw new Error(
            "useFormCreateContext must be used within a FormCreateProvider"
        );
    }

    return context;
}
