import "dayjs/locale/es";
import days, { Dayjs } from "dayjs";

import { DayType, EventType, ViewModeTypes } from "./types";
days.locale("es");

export default days;

export const now = (): Dayjs => days();

export const hours: Dayjs[] = new Array(24)
    .fill(0)
    .map((_, i) => days().startOf("day").add(i, "hour"));

export function getWeekDays(day: Dayjs): Dayjs[] {
    const firstDay = day.set("day", -day.day());

    const daysMatrix = new Array(7).fill(0).map((_, i) => {
        return firstDay.add(i, "day");
    });

    return daysMatrix;
}

export function getMonthDays(
    month: number = days().month(),
    year: number = days().year()
): Dayjs[][] {
    const firstDay = days(`${year}-${month}-01`);

    //allow relate the day number with day of the week in the map
    let currentMonthCount = -firstDay.day();

    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(0).map(() => {
            return firstDay.add(currentMonthCount++, "day");
        });
    });

    return daysMatrix;
}
