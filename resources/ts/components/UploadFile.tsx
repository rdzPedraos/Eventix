import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";

type Props = {
    children: React.ReactNode;
    onUpload: (file: FileList) => void;
} & ButtonProps;

export default function UploadFile({ children, onUpload, ...props }: Props) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        onUpload(files);
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={onChange}
            />

            <Button
                {...props}
                onClick={() => inputRef.current.click()}
                startContent={<ArrowUpTrayIcon width={20} />}
            >
                {children}
            </Button>
        </>
    );
}
