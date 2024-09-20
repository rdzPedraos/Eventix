import React from "react";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { onSearchType } from "./types";

export function Header({
    per_page,
    onSearch,
}: {
    per_page: PaginationProps["per_page"];
    onSearch: onSearchType;
}) {
    return (
        <Select
            className="w-20 ml-auto"
            size="sm"
            aria-label="Paginación"
            selectedKeys={[per_page.toString()]}
            onChange={(e) =>
                onSearch({
                    page: 1,
                    per_page: e.target.value,
                })
            }
        >
            <SelectItem key={5}>5</SelectItem>
            <SelectItem key={10}>10</SelectItem>
            <SelectItem key={15}>15</SelectItem>
        </Select>
    );
}

export function Footer({
    page,
    last_page,
    onSearch,
}: {
    page: PaginationProps["current_page"];
    last_page: PaginationProps["last_page"];
    onSearch: onSearchType;
}) {
    return (
        <Pagination
            className="ml-auto"
            showControls
            showShadow
            color="primary"
            variant="light"
            page={page}
            total={last_page}
            onChange={(page) => onSearch({ page })}
        />
    );
}
