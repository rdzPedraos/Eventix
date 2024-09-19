import {
    AcademicCapIcon,
    CalendarIcon,
    MapPinIcon,
    RectangleStackIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/solid";

export const MenuMap = [
    {
        label: "Calendario",
        to: "home",
        Icon: CalendarIcon,
    },
    {
        label: "Actividades",
        to: "activity.index",
        Icon: RectangleStackIcon,
        permission: "activity.check",
    },
    {
        label: "Roles académicos",
        to: "academic-role.index",
        Icon: AcademicCapIcon,
        permission: "academic_roles.check",
    },
    {
        label: "Espacios académicos",
        to: "place.index",
        Icon: MapPinIcon,
        permission: "places.edit",
    },
    {
        label: "Roles de sistema",
        to: "system-role.index",
        Icon: ShieldCheckIcon,
        permission: "system_roles.list",
    },
];