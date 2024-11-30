import {
    CalendarIcon,
    DocumentChartBarIcon,
    MapPinIcon,
    RectangleStackIcon,
    ShieldCheckIcon,
    UserIcon,
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
        Icon: UserIcon,
        permission: "users.list",
    },
    {
        label: "Gestion de roles",
        to: "roles.index",
        Icon: ShieldCheckIcon,
        permission: "users.set_roles",
    },
];
