import React, { useState } from "react";
import { LoadCalendar, EventInfo, Head, Logo } from "@/components";

export default function Home() {
    return (
        <>
            <Head title="Calendario" />

            <LoadCalendar eventDetail={EventInfo} />

            <div className="fixed bottom-2 right-6 z-50 opacity-40 pointer-events-none">
                <Logo onlyImage={true} />
            </div>
        </>
    );
}
