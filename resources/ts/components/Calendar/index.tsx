import { getMonth } from "@/utils/calendar";
import React from "react";

export default function index() {
    const days = getMonth();

    console.table(days);
    return <div>Calendar...</div>;
}
