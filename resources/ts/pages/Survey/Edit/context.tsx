import React, { createContext, useContext } from "react";
import { usePage } from "@inertiajs/react";

import { Survey } from "@/types/models";
import useFormBuilder from "./hook";

type ContextType = ReturnType<typeof useFormBuilder> & {
    questionTypes: { key: string; value: string }[];
    triggerTypes: { key: string; value: string }[];
    survey: Survey;
};

const FormCreateContext = createContext<ContextType>({} as ContextType);

export default function FormCreateProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { survey, questionTypes, triggerTypes } = usePage<{
        survey: Survey;
        questionTypes: { key: string; value: string }[];
        triggerTypes: { key: string; value: string }[];
    }>().props;

    const data = useFormBuilder(survey);

    return (
        <FormCreateContext.Provider
            value={{ ...data, questionTypes, triggerTypes, survey }}
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
