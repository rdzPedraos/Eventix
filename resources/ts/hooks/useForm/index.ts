import { useForm as _useForm } from "@inertiajs/react";
import { Method, VisitOptions } from "@inertiajs/core";
import { InputTypes, RegisterType, useFormReturnType } from "./types";
import createRegister from "./register";

export default function useForm<T extends object>(
    initialState: T
): useFormReturnType<T> {
    const form = _useForm<T>(initialState);

    const register = createRegister<T>(form);

    const onSubmit = (
        method: Method,
        route: string,
        options?: VisitOptions
    ) => {
        return (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            form.submit(method, route, options);
        };
    };

    const setErrors = (
        errors: Partial<Record<keyof T, string>>,
        keyMap: Record<string, keyof T> = {}
    ) => {
        for (const key in errors) {
            form.setError(keyMap[key] ?? key, errors[key]);
        }
    };

    return {
        ...form,
        register,
        onSubmit,
        setErrors,
    };
}

export type { InputTypes, RegisterType, useFormReturnType };
