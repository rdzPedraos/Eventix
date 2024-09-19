import React from "react";

import { Button, Select, SelectItem } from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import { DayType, ViewModeTypes } from "../utils/types";
import { useCalendarContext } from "../context";

type Props = {};

export default function Header({}: Props) {
    const { now, day, setDay, mode, setMode } = useCalendarContext();

    const goToToday = () => setDay(now);

    const changeWeek = (direction: "left" | "right") => {
        const add = direction === "left" ? -1 : 1;
        setDay((day: DayType) => day.add(add, "week"));
    };

    const onChangeMode = (option) => {
        const mode = option.target.value as ViewModeTypes;
        setMode(mode);
    };

    return (
        <div className="sticky top-0 flex justify-between items-center p-3 bg-white z-50 shadow">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={goToToday}>
                    Hoy
                </Button>

                <div className="flex">
                    <Button
                        variant="light"
                        onClick={() => changeWeek("left")}
                        size="sm"
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="light"
                        onClick={() => changeWeek("right")}
                        size="sm"
                    >
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>

                <h2 className="text-xl font-semibold">
                    {day.format("MMMM [de] YYYY")}
                </h2>
            </div>

            <Select
                className="max-w-32"
                aria-label="Tipo de vista"
                variant="flat"
                color="primary"
                defaultSelectedKeys={[mode]}
                onChange={onChangeMode}
            >
                <SelectItem key="week">Semana</SelectItem>
                <SelectItem key="day">Día</SelectItem>
            </Select>
        </div>
    );
}
