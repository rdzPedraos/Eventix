import React from "react";
import { router } from "@inertiajs/react";

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
    ...props
}: TableProps<T>) {
    const { path, per_page, current_page: page, last_page } = pagination;

    const onSearch: onSearchType = (data) => {
        router.get(path, {
            per_page,
            page,
            ...data,
        });
    };

    return (
        <Table
            {...props}
            topContent={<Header per_page={per_page} onSearch={onSearch} />}
            bottomContent={
                <Footer page={page} last_page={last_page} onSearch={onSearch} />
            }
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
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
