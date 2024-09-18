import React from "react";

import { Image } from "@nextui-org/react";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/utils/PageProps";

type Props = {
    size?: "sm" | "md" | "lg";
    color?: string;
    onlyImage?: boolean;
};

const sizes = {
    sm: { img: 30, text: "text-2xl" },
    md: { img: 40, text: "text-3xl" },
    lg: { img: 80, text: "text-6xl" },
};

export default function Logo({
    size = "md",
    color = "text-gray-200",
    onlyImage = false,
}: Props) {
    const { app } = usePage<PageProps>().props;
    const s = sizes[size];

    const onClick = () => router.get("/");

    return (
        <div
            className="flex gap-1 items-end cursor-pointer hover:opacity-80"
            onClick={onClick}
        >
            <Image
                className="mb-1"
                src="/img/logo.png"
                height={s.img}
                isBlurred
            />

            {!onlyImage && (
                <h1 className={`font-bold ${s.text} ${color}`}>{app.name}</h1>
            )}
        </div>
    );
}
