import {
    AcademicCapIcon,
    CalendarIcon,
    DocumentChartBarIcon,
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
        to: "activities.index",
        Icon: RectangleStackIcon,
        permission: "activity.check",
    },
    {
        label: "Encuestas",
        to: "surveys.index",
        Icon: DocumentChartBarIcon,
        permission: "survey.check",
    },
    /*{
        label: "Roles académicos",
        to: "home", //"academic-role.index",
        Icon: AcademicCapIcon,
        permission: "academic_roles.check",
    },*/
    {
        label: "Espacios académicos",
        to: "sites.index",
        Icon: MapPinIcon,
        permission: "places.edit",
    },
    {
        label: "Gestion de usuarios",
        to: "users.index",
        Icon: ShieldCheckIcon,
        permission: "users.list",
    },
];
