import React from "react";

type Props = {
    message: string;
    condition?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ShowError({
    message,
    condition = null,
    className = "",
    ...props
}: Props) {
    if (!message && !condition) return null;

    return (
        <div className={`text-red-600 text-xs ${className}`} {...props}>
            {message}
        </div>
    );
}
