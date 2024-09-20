export type ActivityResource = {
    id: number;
    name: string;
    description: string | null;
    status: {
        color:
            | "success"
            | "danger"
            | "warning"
            | "default"
            | "primary"
            | "secondary";
        label: string;
        isClosed: boolean;
    };
    color: string;
    created_at: string | null;
    updated_at: string | null;
    created_by: number;
    image: string | null;
};
