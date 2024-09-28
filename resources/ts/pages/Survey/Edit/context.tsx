import React, { createContext, useContext } from "react";
import { usePage } from "@inertiajs/react";

import { Survey } from "@/types/models";
import useFormBuilder from "./hook";

type ContextType = ReturnType<typeof useFormBuilder>;

const FormCreateContext = createContext<ContextType>({} as ContextType);

export default function FormCreateProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { survey } = usePage<{
        survey: Survey;
    }>().props;
    const data = useFormBuilder(survey);

    return (
        <FormCreateContext.Provider value={data}>
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
