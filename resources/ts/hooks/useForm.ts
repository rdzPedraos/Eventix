import { useForm as _useForm } from "@inertiajs/react";
import { Method, VisitOptions } from "@inertiajs/core";
import { InertiaFormProps } from "@inertiajs/react/types/useForm";

type RegisterReturn = {
    value?: any;
    isChecked?: boolean;
    onValueChange: (value: any) => void;
};

type InputTypes = "text" | "checkbox";

const createRegister = <T extends object>(form: InertiaFormProps<T>) => {
    function callback(key: keyof T, type: InputTypes = "text"): RegisterReturn {
        const value = form.data[key];
        const onValueChange = (value: any) => {
            form.clearErrors(key);
            form.setData(key, value as T[keyof T]);
        };

        switch (type) {
            case "checkbox":
                return {
                    isChecked: value as boolean,
                    onValueChange,
                };
        }

        return { value, onValueChange };
    }

    return callback;
};

export function useForm<T extends object>(initialState: T) {
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

    return {
        ...form,
        register,
        onSubmit,
    };
}
