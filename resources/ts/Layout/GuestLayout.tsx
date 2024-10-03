import React from "react";
import Logo from "../components/Logo";
import { Image } from "@nextui-org/react";

type Props = {
    children: React.ReactNode;
};

export default function GuestLayout({ children }: Props) {
    return (
        <div className="lg:grid grid-cols-2 h-screen items-center">
            <div className="relative h-full p-8 md:p-16 overflow-y-auto scrollbar-custom">
                {children}
            </div>

            <div className="hidden lg:flex justify-center h-full bg-gradient-to-tr from-green-700 to-primary-800 place-items-center">
                <Image
                    src="img/login.svg"
                    width={600}
                    alt="animacion de calendario"
                />
            </div>
        </div>
    );
}
