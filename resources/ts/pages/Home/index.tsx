import React from "react";
import { LoadCalendar, Head, Logo } from "@/components";
import EventInfo from "./partials/EventInfo";
import AuthLayout from "@/Layout/AuthLayout";

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

Home.layout = (page) => <AuthLayout paddingX={null}>{page}</AuthLayout>;
