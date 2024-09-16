import React from "react";
import Logo from "../components/Logo";
import { Image } from "@nextui-org/react";

type Props = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
    return (
        <div className="md:grid grid-cols-2 h-screen items-center">
            <div className="relative h-full flex items-center justify-center p-8 md:p-16">
                {children}
            </div>
            <div className="hidden md:block h-full bg-gradient-to-tr from-green-700 to-primary-800">
                <div className="h-full flex flex-col items-center justify-center">
                    <Logo />

                    <Image
                        src="img/login.svg"
                        className="-mt-14"
                        width={600}
                        alt="animacion de calendario"
                    />
                </div>
            </div>
        </div>
    );
}
