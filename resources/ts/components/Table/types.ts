import { TableProps as ParenTableProps } from "@nextui-org/react";

export type ItemObject = {
    id: number;
    [key: string]: any;
};

export type TableProps<T> = {
    columns: { uid: string; label: string }[];
    data: T[];
    renderCell: (item: T, column_uid: string) => JSX.Element;
    pagination: PaginationProps;
} & Partial<ParenTableProps>;

export type onSearchType = (
    data: Partial<{
        page: PaginationProps["current_page"];
        per_page: PaginationProps["per_page"];
    }>
) => void;
