import React from "react";
import Logo from "./Logo";

type Props = {};

export default function WaterMark({}: Props) {
    return (
        <div className="fixed bottom-4 right-4 z-50 opacity-40 pointer-events-none">
            <Logo onlyImage={true} />
        </div>
    );
}
