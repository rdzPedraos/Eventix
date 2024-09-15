import "dayjs/locale/es";
import days, { Dayjs } from "dayjs";
import colors from "./colors";
days.locale("es");

export default days;

export const now = (): Dayjs => days();

export const hours: Dayjs[] = new Array(24)
    .fill(0)
    .map((_, i) => days().startOf("day").add(i, "hour"));

export function getWeekDays(week: Dayjs): Dayjs[] {
    const firstDay = week.startOf("week").add(-1, "day");

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

export function generateRandomEvents(day: Day) {
    const week = day.startOf("week");

    const events = Array(40)
        .fill(null)
        .map((_, i) => {
            const color = colors[Math.floor(Math.random() * colors.length)];

            const title = `Evento ${i + 1}`;
            const description = `Descripción del evento ${i + 1}`;

            const startDate = week
                .add(Math.floor(Math.random() * 7), "day")
                .startOf("day")
                .add(Math.floor(Math.random() * 23), "hour")
                .add(Math.floor(Math.random() * 4) * 15, "minute"); // 0, 15, 30, or 45 minutes

            const endDate = startDate.add(
                Math.floor(Math.random() * (24 - startDate.hour())) * 15,
                "minute"
            );

            return {
                id: i.toString(),
                startDate,
                endDate,
                title,
                color,
                description,
            };
        });

    return events;
}
