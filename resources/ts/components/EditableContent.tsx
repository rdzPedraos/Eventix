import React, { useEffect, useRef } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    className?: string;
} & Omit<React.HTMLProps<HTMLTextAreaElement>, "ref">;

export default function EditableContent({
    value,
    onChange,
    className,
    ...props
}: Props) {
    const txtAreaRef = useRef(null);

    const fixSize = () => {
        const txtArea = txtAreaRef.current;
        if (txtArea) {
            txtArea.style.height = "auto";
            txtArea.style.height = `${txtArea.scrollHeight}px`;
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    useEffect(() => {
        fixSize();
    }, [value]);

    return (
        <textarea
            ref={txtAreaRef}
            {...props}
            value={value}
            onChange={onChangeHandler}
            className={`overflow-hidden resize-none focus:outline-none ${className}`}
            rows={1}
        />
    );
}
