import React from "react";
import { Image } from "@nextui-org/react";
import WaterMark from "@/components/WaterMark";

type Props = {
    children: React.ReactNode;
};

export default function SurveyLayout({ children }: Props) {
    return (
        <>
            <main>{children}</main>
            <WaterMark />
            <div className="fixed top-0 left-0 h-full -z-10 bg-default-50">
                <Image radius="none" src="/img/bg-circles.svg" />
            </div>
        </>
    );
}
