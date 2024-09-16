import { PageProps } from "@/utils/PageProps";
import { Head as _Head, usePage } from "@inertiajs/react";
import React from "react";

type Props = {
    title: string;
    children?: React.ReactNode;
};

export default function Head({ title, children }: Props) {
    const { app } = usePage<PageProps>().props;
    return (
        <_Head>
            <title>{`${app.name} | ${title}`}</title>
            {children}
        </_Head>
    );
}
