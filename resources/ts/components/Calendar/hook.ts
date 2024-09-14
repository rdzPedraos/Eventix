import { Day } from "./utils";

export const colors = [
    "bg-blue-100 border-blue-300",
    "bg-green-100 border-green-300",
    "bg-purple-100 border-purple-300",
    "bg-red-100 border-red-300",
    "bg-yellow-100 border-yellow-300",
];

export default function generateRandomEvents(day: Day) {
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
