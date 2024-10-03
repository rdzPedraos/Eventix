import React from "react";

const colors = [
    "bg-gray-50 ring-gray-500 text-gray-600 ring-gray-500/10",
    "bg-yellow-50 ring-yellow-500 text-yellow-600 ring-yellow-500/10",
    "bg-green-50 ring-green-500 text-green-600 ring-green-500/10",
    "bg-blue-50 ring-blue-500 text-blue-600 ring-blue-500/10",
    "bg-indigo-50 ring-indigo-500 text-indigo-600 ring-indigo-500/10",
    "bg-red-50 ring-red-500 text-red-600 ring-red-500/10",
    "bg-purple-50 ring-purple-500 text-purple-600 ring-purple-500/10",
];

type Props = {
    color?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function Badge({ children, className, color, ...props }: Props) {
    if (!color) {
        const value = children.toString().length;
        color = colors[value % colors.length];
    }

    return (
        <span
            {...props}
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${color} ${className}`}
        >
            {children}
        </span>
    );
}
