import React from "react";
import { Calendar, EventInfo } from "@/components";

export default function Home() {
    return (
        <div className="h-screen">
            <Calendar eventDetail={EventInfo} />
        </div>
    );
}
