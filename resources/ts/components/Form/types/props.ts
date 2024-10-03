export type PropsField = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    clearError: () => void;
    error?: string;
    options?: string[];
};
