import days, { Dayjs } from "dayjs";

export function getMonth(
    month: number = days().month(),
    year: number = days().year()
): Array<Dayjs> {
    const firstDay = days(`${year}-${month}-01`);

    //allow relate the day number with day of the week in the map
    let currentMonthCount = -firstDay.day();

    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(0).map(() => {
            return firstDay.add(currentMonthCount++, "day");
        });
    });

    return daysMatrix.flat();
}
