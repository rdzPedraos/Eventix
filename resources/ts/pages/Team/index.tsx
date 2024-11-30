import React from "react";
import { route } from "@ziggyjs";

import { UserResource } from "@/types/resources";
import { Activity } from "@/types/models";

import { Container } from "@/components";
import Header from "./partials/Header";
import Form from "./partials/Form";
import List from "./partials/List";

type Props = {
    builders: CollectionProps<UserResource>;
    activity: Activity;
};

export default function Index({ builders }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <Container classNameContent="flex flex-col gap-4">
                <Header />
                <Form />
            </Container>

            <Container>
                <List builders={builders} />
            </Container>
        </div>
    );
}

Index.breadcrumb = ({ activity }: Props) => ({
    current: "Equipo",
    items: [
        { to: route("home"), label: "Calendario" },
        { to: route("activities.index"), label: "Actividades" },
        {
            to: route("activities.edit", { activity }),
            label: activity.name,
        },
    ],
});
