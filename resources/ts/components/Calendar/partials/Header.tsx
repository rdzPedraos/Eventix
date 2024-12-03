import React from "react";

import { Button, Select, SelectItem } from "@nextui-org/react";
import {
    Bars3Icon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";

import { DayType, ViewModeTypes } from "../utils/types";
import { useCalendarContext } from "../";

type Props = {};

export default function Header({}: Props) {
    const { filters, setFilter, now, sideBar, openSidebar, toggleSideBar } =
        useCalendarContext();

    const goToToday = () => setFilter("day", now);

    const changeDay = (direction: "left" | "right") => {
        const add = direction === "left" ? -1 : 1;
        const type = filters.mode === "day" ? "day" : "week";

        setFilter("day", filters.day.add(add, type));
    };

    const onChangeMode = (option) => {
        const mode = option.target.value as ViewModeTypes;
        setFilter("mode", mode);
    };

    return (
        <div className="sticky top-0 flex flex-wrap gap-4 justify-between items-center p-3 bg-white z-50 shadow">
            <div className="flex gap-4">
                {sideBar && (
                    <button onClick={() => toggleSideBar((s) => !s)}>
                        {openSidebar ? (
                            <XMarkIcon width={30} />
                        ) : (
                            <Bars3Icon width={30} />
                        )}
                    </button>
                )}

                <Button
                    variant="flat"
                    size="sm"
                    color="primary"
                    onClick={goToToday}
                >
                    Hoy
                </Button>

                <div className="flex">
                    <Button
                        variant="light"
                        onClick={() => changeDay("left")}
                        size="sm"
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="light"
                        onClick={() => changeDay("right")}
                        size="sm"
                    >
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <h2 className="text-xl font-semibold first-letter:uppercase">
                {filters.mode === "week"
                    ? filters.day.format("MMMM [de] YYYY")
                    : filters.day.format("DD [de] MMMM [de] YYYY")}
            </h2>

            <Select
                disallowEmptySelection
                className="max-w-32 ml-auto"
                aria-label="Tipo de vista"
                variant="flat"
                color="primary"
                defaultSelectedKeys={[filters.mode]}
                onChange={onChangeMode}
            >
                <SelectItem key="week">Semana</SelectItem>
                <SelectItem key="day">Día</SelectItem>
            </Select>
        </div>
    );
}
