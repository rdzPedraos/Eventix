import { Image } from "@nextui-org/react";
import React from "react";

type Props = {
    children: React.ReactNode;
};

export default function ErrorLayout({ children }: Props) {
    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-primary-100 to-secondary-100">
            <div className="flex gap-4">
                <div className="relative">
                    <Image src="/img/emoji_sad.png" width={150} height={150} />
                    <div className="absolute w-[350px] h-[350px] -top-[100px] -left-[100px] bg-black opacity-5 rounded-full"></div>
                </div>

                <div className="relative z-10">{children}</div>
            </div>
        </div>
    );
}
