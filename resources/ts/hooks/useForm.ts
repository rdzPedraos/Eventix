import { useForm as _useForm } from "@inertiajs/react";
import { Method, VisitOptions } from "@inertiajs/core";

export function useForm<T extends object>(initialState: T) {
    const form = _useForm<T>(initialState);

    const register = (key: keyof T) => {
        return {
            value: form.data[key],
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                form.clearErrors(key);
                form.setData(key, e.target.value as T[keyof T]);
            },
        };
    };

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

    return {
        ...form,
        register,
        onSubmit,
    };
}
