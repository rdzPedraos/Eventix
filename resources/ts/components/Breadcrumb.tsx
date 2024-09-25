import { router } from "@inertiajs/react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React from "react";
import Head from "./Head";

type BreadcrumpProp = {
    to: string;
    label: string;
    Icon?: React.ReactNode;
}[];

type Props = {
    items: BreadcrumpProp;
    current?: string;
} & React.ComponentProps<typeof Breadcrumbs>;

export default function Breadcrumb({
    current,
    items,
    className = "mx-7 my-4",
    ...props
}: Props) {
    return (
        <>
            {current && <Head title={current} />}

            <Breadcrumbs
                color="primary"
                size="lg"
                onAction={(to) => router.get(to.toString())}
                className={className}
                {...props}
            >
                {items.map(({ Icon, to, label }) => (
                    <BreadcrumbItem key={to} startContent={Icon ?? null}>
                        {label}
                    </BreadcrumbItem>
                ))}

                {current && <BreadcrumbItem>{current}</BreadcrumbItem>}
            </Breadcrumbs>
        </>
    );
}
