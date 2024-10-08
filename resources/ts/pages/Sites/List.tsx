import { Breadcrumb, Container, Table } from "@/components";
import Confirm from "@/components/Confirm";
import { Sites } from "@/types/models";
import { SiteResource } from "@/types/resources";
import {
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { router, usePage } from "@inertiajs/react";
import { Button, Link, Tooltip } from "@nextui-org/react";
import { route } from "@ziggyjs";
import React from "react";

type Props = {};

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

export default function List({}: Props) {
    const {
        sites: { data, meta },
    } = usePage<{
        sites: CollectionProps<SiteResource>;
    }>().props;

    return (
        <>
            <Breadcrumb
                current="Espacios académicos"
                items={[{ to: route("home"), label: "Calendario" }]}
            />

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
        </>
    );
}
