import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { InboxIcon } from "@heroicons/react/24/solid";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";

import { Role, User } from "@/types/models";
import useForm from "@/hooks/useForm";

type Props = {};

export default function RolesForm({}: Props) {
    const { user, currentRoles, roles } = usePage<{
        user: User;
        roles: Role[];
        currentRoles: string[];
    }>().props;

    const { data, setData, onSubmit } = useForm({
        roles: currentRoles,
    });

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Roles del usuario</h1>
                    <p className="text-default-600 mb-4">
                        Selecciona los roles que deseas asignar al usuario.
                    </p>
                </div>

                <Button
                    color="primary"
                    variant="flat"
                    onClick={onSubmit(
                        "put",
                        route("users.update_roles", { user: user.id })
                    )}
                    endContent={<InboxIcon width={20} />}
                >
                    Guardar
                </Button>
            </div>

            <form className="flex flex-col gap-4">
                <CheckboxGroup
                    label="Roles"
                    defaultValue={data.roles}
                    onValueChange={(values) => setData("roles", values)}
                >
                    {roles.map(({ id, name }) => (
                        <Checkbox key={id} value={name}>
                            {name}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            </form>
        </>
    );
}
