import React from "react";
import { router, usePage } from "@inertiajs/react";
import {
    Chip,
    Pagination,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";

import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ActivityResource } from "@/types/resources";

const columns = [
    { uid: "name", label: "Titulo" },
    { uid: "description", label: "Descripción" },
    { uid: "status", label: "Estado" },
    { uid: "actions", label: "Acciones" },
];

const renderCell = (activity: ActivityResource, columnKey: string) => {
    switch (columnKey) {
        case "status":
            const status = activity.status;

            return (
                <Chip
                    className="mx-auto flex capitalize"
                    color={status.color}
                    size="sm"
                    variant="flat"
                >
                    {status.label}
                </Chip>
            );

        case "actions":
            if (activity.status.isClosed) return null;

            return (
                <Tooltip content="Revisar actividad">
                    <PencilSquareIcon
                        width={18}
                        className="cursor-pointer text-default-500 mx-auto"
                    />
                </Tooltip>
            );

        default:
            return activity[columnKey];
    }
};

export default function List() {
    const {
        activities: { data, meta },
    } = usePage<{
        activities: CollectionProps<ActivityResource>;
    }>().props;

    const disabledKeys = data
        .filter((activity) => activity.status.isClosed)
        .map((activity) => activity.id.toString());

    console.log(data);

    const searchData = (attr) => {
        router.get(meta.path, {
            per_page: meta.per_page,
            page: meta.current_page,
            ...attr,
        });
    };

    return (
        <div className="px-5 py-3">
            <Table
                selectionMode="multiple"
                aria-label="Actividades"
                disabledKeys={disabledKeys}
                topContent={
                    <Select
                        className="w-20 ml-auto"
                        size="sm"
                        aria-label="Paginación"
                        selectedKeys={[meta.per_page.toString()]}
                        onChange={(e) =>
                            searchData({
                                page: 1,
                                per_page: e.target.value,
                            })
                        }
                    >
                        <SelectItem key={5}>5</SelectItem>
                        <SelectItem key={10}>10</SelectItem>
                        <SelectItem key={15}>15</SelectItem>
                    </Select>
                }
                bottomContent={
                    <Pagination
                        className="ml-auto"
                        showControls
                        showShadow
                        color="primary"
                        variant="light"
                        page={meta.current_page}
                        total={meta.last_page}
                        onChange={(page) => searchData({ page })}
                    />
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
                <TableBody
                    emptyContent="Crea una actividad primero"
                    items={data}
                >
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
        </div>
    );
}
