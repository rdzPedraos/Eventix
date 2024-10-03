import React from "react";

export default function Container({
    children,
    startContent,
    className,
    classNameContent,
}: {
    children: React.ReactNode;
    startContent?: React.ReactNode;
    className?: string;
    classNameContent?: string;
}) {
    return (
        <div
            className={`bg-white shadow border-1 rounded-xl overflow-hidden ${className}`}
        >
            {startContent}
            <div className={`p-5 ${classNameContent}`}>{children}</div>
        </div>
    );
}
