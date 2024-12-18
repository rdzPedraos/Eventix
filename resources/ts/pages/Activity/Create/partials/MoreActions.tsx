import React from "react";
import { route } from "@ziggyjs";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { useActivityCreateContext } from "../context";

type Props = {};

export default function MoreActions({}: Props) {
    const { activity } = useActivityCreateContext();

    return (
        <div>
            {activity && (
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="flat" isIconOnly>
                            <EllipsisHorizontalIcon width={20} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem
                            href={route("surveys.index", { activity })}
                        >
                            👁️ Encuestas
                        </DropdownItem>

                        <DropdownItem
                            href={route("activities.team.index", { activity })}
                        >
                            🛠️ Equipo
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )}
        </div>
    );
}
