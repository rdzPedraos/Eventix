import { InertiaFormProps } from "@inertiajs/react/types/useForm";
import { InputTypes, RegisterType } from "./types";

const registerCheckbox = <T extends object>(
    form: InertiaFormProps<T>,
    key: keyof T
) => {
    return {
        defaultSelected: form.data[key] as boolean,
        onValueChange: (value: boolean) => {
            form.clearErrors(key);
            form.setData(key, value as T[keyof T]);
        },
    };
};

const registerCheckBoxGroup = <T extends object>(
    form: InertiaFormProps<T>,
    key: keyof T
) => {
    return {
        defaultValue: form.data[key] as string[],
        onValueChange: (e: string[]) => {
            form.clearErrors(key);
            form.setData(key, e as T[keyof T]);
        },
    };
};

const registerSelect = <T extends object>(
    form: InertiaFormProps<T>,
    key: keyof T
) => {
    return {
        selectedKeys: [form.data[key]] as string[],
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
            form.clearErrors(key);
            form.setData(key, e.target.value as T[keyof T]);
        },
        isInvalid: !!form.errors[key],
        errorMessage: form.errors[key] as string,
    };
};

const registerOtpBox = <T extends object>(
    form: InertiaFormProps<T>,
    key: keyof T
) => {
    return {
        value: form.data[key] as string,
        onChange: (value: string) => {
            form.clearErrors(key);
            form.setData(key, value as T[keyof T]);
        },
        isInvalid: !!form.errors[key],
        errorMessage: form.errors[key] as string,
    };
};

const registerInput = <T extends object>(
    form: InertiaFormProps<T>,
    key: keyof T
) => {
    return {
        defaultValue: form.data[key] as string,
        onValueChange: (value: string) => {
            form.clearErrors(key);
            form.setData(key, value as T[keyof T]);
        },
        isInvalid: !!form.errors[key],
        errorMessage: form.errors[key] as string,
    };
};

const registerEditableContent = <T extends object>(
    form: InertiaFormProps<T>,
    key: keyof T
) => {
    return {
        value: form.data[key] as string,
        onChange: (value: string) => {
            form.clearErrors(key);
            form.setData(key, value as T[keyof T]);
        },
        error: form.errors[key] as string,
    };
};

export default function createRegister<T extends object>(
    form: InertiaFormProps<T>
): RegisterType<T> {
    return (key: keyof T, type: InputTypes = "text") => {
        switch (type) {
            case "checkbox":
                return registerCheckbox(form, key);
            case "checkbox_group":
                return registerCheckBoxGroup(form, key);
            case "select":
                return registerSelect(form, key);
            case "otpbox":
                return registerOtpBox(form, key);
            case "editable_content":
                return registerEditableContent(form, key);
            default:
                return registerInput(form, key);
        }
    };
}
