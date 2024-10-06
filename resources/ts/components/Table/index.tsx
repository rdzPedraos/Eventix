import React from "react";
import { router, usePage } from "@inertiajs/react";

import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";

import { ItemObject, onSearchType, TableProps } from "./types";
import { Footer, Header } from "./Pagination";

export default function index<T extends ItemObject>({
    columns,
    data,
    renderCell,
    pagination,
    topContent,
    ...props
}: TableProps<T>) {
    const { per_page, current_page, last_page } = pagination;
    const { url } = usePage();

    const onSearch: onSearchType = (data) => {
        router.get(url, {
            ...data,
        });
    };

    const urlParams = new URLSearchParams(url.split("?")[1]);
    const filters = {
        search: urlParams.get("search") || "",
        page: current_page,
        per_page: per_page.toString(),
    };

    return (
        <Table
            removeWrapper={true}
            {...props}
            topContent={
                <Header
                    content={topContent}
                    onSearch={onSearch}
                    filters={filters}
                />
            }
            bottomContent={
                <Footer
                    filters={filters}
                    last_page={last_page}
                    onSearch={onSearch}
                />
            }
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column?.align}
                        className="text-center uppercase"
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody emptyContent="Crea un registro primero" items={data}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(item, columnKey as string)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
