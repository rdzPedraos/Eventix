import { InertiaFormProps } from "@inertiajs/react/types/useForm";
import { Method, VisitOptions } from "@inertiajs/core";

export type InputTypes =
    | "text"
    | "checkbox"
    | "select"
    | "otpbox"
    | "editable_content";

export type RegisterType<T extends object> = (
    key: keyof T,
    type?: InputTypes
) => any;

export type useFormReturnType<T extends object> = InertiaFormProps<T> & {
    onSubmit: (
        method: Method,
        route: string,
        options?: VisitOptions
    ) => (e?: any) => void;

    setErrors: (
        errors: Partial<Record<keyof T, string>>,
        keyMap?: Record<string, keyof T>
    ) => void;

    register: RegisterType<T>;
};
