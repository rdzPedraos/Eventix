import { Breadcrumb, Container, Table } from "@/components";
import { Sites } from "@/types/models";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import { usePage } from "@inertiajs/react";
import { Button, Link, Tooltip } from "@nextui-org/react";
import { route } from "@ziggyjs";
import React from "react";

type Props = {};

const renderCell = (site: Sites, columnKey: string) => {
    switch (columnKey) {
        case "actions":
            return (
                <Tooltip content="Editar lugar">
                    <Link href={route("sites.edit", { site })}>
                        <PencilSquareIcon
                            width={18}
                            className="cursor-pointer text-default-500 mx-auto"
                        />
                    </Link>
                </Tooltip>
            );

        default:
            return site[columnKey];
    }
};

export default function List({}: Props) {
    const {
        sites: { data, meta },
    } = usePage<{
        sites: CollectionProps<Sites>;
    }>().props;

    return (
        <>
            <Breadcrumb
                current="Espacios académicos"
                items={[{ to: route("home"), label: "Calendario" }]}
            />

            <Container>
                <Table
                    aria-label="Actividades"
                    data={data}
                    pagination={meta}
                    columns={[
                        { uid: "name", label: "Titulo" },
                        { uid: "address", label: "Dirección" },
                        { uid: "actions", label: "Acciones", align: "center" },
                    ]}
                    renderCell={renderCell}
                    topContent={
                        <Button
                            as={Link}
                            href={route("activities.create")}
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
