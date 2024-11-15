import React from "react";
import { Image } from "@nextui-org/react";
import WaterMark from "@/components/WaterMark";

type Props = {
    children: React.ReactNode;
};

export default function SurveyLayout({ children }: Props) {
    return (
        <>
            <main className="min-h-screen bg-gradient-to-r from-primary-50 to-primary-200">{children}</main>
            <WaterMark />
        </>
    );
}
