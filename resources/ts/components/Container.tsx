import React from "react";

export default function Container({
    children,
    startContent,
    className,
}: {
    children: React.ReactNode;
    startContent?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`bg-white shadow border-1 rounded-xl overflow-hidden ${className}`}
        >
            {startContent}
            <div className="p-5">{children}</div>
        </div>
    );
}
