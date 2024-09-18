import { InertiaFormProps } from "@inertiajs/react/types/useForm";
import { Method, VisitOptions } from "@inertiajs/core";

export type InputTypes = "text" | "checkbox" | "select";

export type useFormReturnType<T extends object> = InertiaFormProps<T> & {
    onSubmit: (
        method: Method,
        route: string,
        options?: VisitOptions
    ) => (e: React.FormEvent<HTMLFormElement>) => void;
    setErrors: (
        errors: Partial<Record<keyof T, string>>,
        keyMap?: Record<string, keyof T>
    ) => void;
    register: (key: keyof T, type?: InputTypes) => any;
};
