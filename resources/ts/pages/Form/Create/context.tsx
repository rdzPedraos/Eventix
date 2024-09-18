import React, { createContext, ReactNode, useContext, useState } from "react";
import useFormBuilder from "./hook";

type ContextType = ReturnType<typeof useFormBuilder>;

const FormCreateContext = createContext<ContextType>({} as ContextType);

export default function FormCreateProvider({
    children,
}: {
    children: ReactNode;
}) {
    const data = useFormBuilder();

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
            "useFormCreateContext must be used within a CalendarProvider"
        );
    }

    return context;
}
