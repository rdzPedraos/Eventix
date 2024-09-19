import { useForm as _useForm } from "@inertiajs/react";

import { Method, VisitOptions } from "@inertiajs/core";
import { InertiaFormProps } from "@inertiajs/react/types/useForm";
import { InputTypes, RegisterType, useFormReturnType } from "./types";

const createRegister = <T extends object>(
    form: InertiaFormProps<T>
): RegisterType<T> => {
    function getErrorMessage(key: keyof T) {
        const errorMessage = form.errors[key] as string;
        return {
            isInvalid: !!errorMessage,
            errorMessage,
        };
    }

    function callback(key: keyof T, type: InputTypes = "text"): object {
        const { isInvalid, errorMessage } = getErrorMessage(key);

        switch (type) {
            case "checkbox":
                return {
                    checked: form.data[key] as boolean,
                    onValueChange: (value: boolean) => {
                        form.clearErrors(key);
                        form.setData(key, value as T[keyof T]);
                    },
                };

            case "select":
                return {
                    selectedKeys: [form.data[key]] as string[],
                    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                        form.setData(key, e.target.value as T[keyof T]);
                    },
                    isInvalid,
                    errorMessage,
                };

            default:
                return {
                    value: form.data[key] as string,
                    onValueChange: (value: string) => {
                        form.clearErrors(key);
                        form.setData(key, value as T[keyof T]);
                    },
                    isInvalid,
                    errorMessage,
                };
        }
    }

    return callback;
};

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
