import React, { useRef } from "react";
import { Input, Pagination, Select, SelectItem } from "@nextui-org/react";
import { FilterProps, onSearchType } from "./types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function Header({
    content,
    onSearch,
    filters,
}: {
    content?: React.ReactNode;
    onSearch: onSearchType;
    filters: FilterProps;
}) {
    const searchRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col-reverse md:flex-row-reverse justify-between gap-4">
            <div className="flex gap-2">
                <Input
                    ref={searchRef}
                    className="w-fit"
                    placeholder="Buscar..."
                    defaultValue={filters.search}
                    onClear={() => onSearch({ search: "" })}
                    startContent={
                        <MagnifyingGlassIcon
                            onClick={() =>
                                onSearch({
                                    search: searchRef.current.value,
                                })
                            }
                            width={20}
                            className="cursor-pointer"
                        />
                    }
                    isClearable
                />

                <Select
                    className="w-20 ml-auto"
                    aria-label="Paginación"
                    selectedKeys={[filters.per_page.toString()]}
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
            </div>

            {content}
        </div>
    );
}

export function Footer({
    filters,
    last_page,
    onSearch,
}: {
    filters: FilterProps;
    last_page: PaginationProps["last_page"];
    onSearch: onSearchType;
}) {
    return (
        <Pagination
            classNames={{
                base: "flex justify-end gap-2",
            }}
            showControls
            showShadow
            color="primary"
            variant="light"
            page={filters.page}
            total={last_page}
            onChange={(page) => onSearch({ page })}
        />
    );
}
