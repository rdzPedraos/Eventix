import React from "react";

export default function Container({
    children,
    startContent,
}: {
    children: React.ReactNode;
    startContent?: React.ReactNode;
}) {
    return (
        <div className="relative bg-white shadow border-1 rounded-xl overflow-hidden">
            {startContent}
            <div className="p-5">{children}</div>
        </div>
    );
}
