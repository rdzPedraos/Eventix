import React from "react";
import { Calendar, EventInfo, Logo } from "@/components";

export default function Home() {
    return (
        <div>
            <Calendar eventDetail={EventInfo} />

            <div className="fixed bottom-2 right-2 z-50 opacity-40 pointer-events-none">
                <Logo onlyImage={true} />
            </div>
        </div>
    );
}
