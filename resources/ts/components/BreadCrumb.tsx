import { router } from "@inertiajs/react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React, { useMemo } from "react";
import Head from "./Head";
import { formalText, shortText } from "@/utils";

type BreadcrumpProp = {
    to: string;
    label: string;
    Icon?: React.ReactNode;
}[];

type BreadCrumbProps = {
    items: BreadcrumpProp;
    current?: string;
} & React.ComponentProps<typeof Breadcrumbs>;

function BreadCrumb({
    current,
    items,
    className = "mx-4 my-4",
    ...props
}: BreadCrumbProps) {
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
                        {shortText(formalText(label))}
                    </BreadcrumbItem>
                ))}

                {current && (
                    <BreadcrumbItem>
                        {shortText(formalText(current))}
                    </BreadcrumbItem>
                )}
            </Breadcrumbs>
        </>
    );
}

export { BreadCrumb };
export type { BreadCrumbProps };
