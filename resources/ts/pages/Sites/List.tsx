import React from "react";
import { route } from "@ziggyjs";
import { router, usePage } from "@inertiajs/react";
import { Button, Link, Tooltip } from "@nextui-org/react";
import {
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";

import { SiteResource } from "@/types/resources";
import { Sites } from "@/types/models";
import Confirm from "@/components/Confirm";
import { Container, Table } from "@/components";


const renderCell = (site: Sites, columnKey: string) => {
    switch (columnKey) {
        case "actions":
            return (
                <>
                    <Tooltip content="Editar lugar">
                        <Link
                            href={route("sites.edit", { site })}
                            className="cursor-pointer text-default-500"
                        >
                            <PencilSquareIcon width={18} />
                        </Link>
                    </Tooltip>

                    <Confirm confirmColor="danger">
                        <Tooltip content="Eliminar lugar">
                            <button
                                className="cursor-pointer ms-4 text-danger"
                                onClick={() =>
                                    router.delete(
                                        route("sites.destroy", { site })
                                    )
                                }
                            >
                                <TrashIcon width={18} />
                            </button>
                        </Tooltip>
                    </Confirm>
                </>
            );

        default:
            return site[columnKey];
    }
};

type Props = {
    sites: CollectionProps<SiteResource>;
}


export default function List({sites}: Props) {
    const  { data, meta } = sites;

    return (
        <Container>
            <Table
                aria-label="Lugares académicos"
                data={data}
                pagination={meta}
                columns={[
                    { uid: "name", label: "Etiqueta" },
                    { uid: "address", label: "Dirección" },
                    { uid: "actions", label: "Acciones", align: "center" },
                ]}
                renderCell={renderCell}
                topContent={
                    <Button
                        as={Link}
                        href={route("sites.create")}
                        color="primary"
                        variant="flat"
                        startContent={<PlusIcon width={20} />}
                    >
                        Agregar lugar
                    </Button>
                }
            />
        </Container>
    );
}


List.breadcrumb = {
    current: "Espacios académicos",
    items: [{ to: route("home"), label: "Calendario" }]
}
