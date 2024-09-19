import React, { useMemo } from "react";

import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { route } from "@ziggyjs";

import { MenuMap } from "./MenuMap";
import { Link } from "@inertiajs/react";
import { Logo } from "@/components";

type Props = {
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    permissions: PageProps["auth"]["permissions"];
};

export default function MainSidebar({
    openSidebar,
    setOpenSidebar,
    permissions,
}: Props) {
    const sections = useMemo(
        () =>
            MenuMap.filter(
                ({ permission }) =>
                    !permission || permissions.includes(permission)
            ),
        [permissions]
    );

    const current = route().current();

    return (
        <Sidebar
            collapsed={!openSidebar}
            toggled={openSidebar}
            onBackdropClick={() => setOpenSidebar(false)}
            breakPoint="md"
            backgroundColor="#fff"
            className="h-full text-primary shadow-lg"
        >
            <div className="pl-7 py-4 border-b-1 md:hidden">
                <Logo />
            </div>

            <Menu
                menuItemStyles={{
                    button: {
                        "&.ps-active": {
                            backgroundColor: "#efefef",

                            "&:hover": {
                                backgroundColor: "#e2e2e2",
                            },
                        },
                    },
                }}
            >
                {sections.map(({ label, Icon, to }) => {
                    return (
                        <MenuItem
                            active={current === to}
                            key={label}
                            component={<Link href={route(to)} />}
                            icon={<Icon width={20} />}
                        >
                            <span className="">{label}</span>
                        </MenuItem>
                    );
                })}
            </Menu>
        </Sidebar>
    );
}
