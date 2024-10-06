import { TableProps as ParenTableProps } from "@nextui-org/react";

export type ItemObject = {
    id: number;
    [key: string]: any;
};

export type TableProps<T> = {
    columns: {
        uid: string;
        label: string;
        align?: "center" | "end" | "start";
    }[];
    data: T[];
    renderCell: (item: T, column_uid: string) => JSX.Element;
    pagination: PaginationProps;

    topContent?: React.ReactNode;
} & Partial<ParenTableProps>;

export type onSearchType = (
    data: Partial<{
        page: PaginationProps["current_page"];
        per_page: PaginationProps["per_page"];
        search: string;
    }>
) => void;

export type FilterProps = {
    search?: string;
    page: number;
    per_page: string;
};
