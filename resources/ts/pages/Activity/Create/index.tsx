import React from "react";
import ActivityCreateProvider from "./context";
import CreateActivity from "./partials";

export default function Create() {
    return (
        <ActivityCreateProvider>
            <CreateActivity />
        </ActivityCreateProvider>
    );
}
