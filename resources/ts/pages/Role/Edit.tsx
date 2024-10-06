import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";

import { Role } from "@/types/models";
import useForm from "@/hooks/useForm";
import { Breadcrumb, Container } from "@/components";

export default function Edit() {
    const { role, permissions } = usePage<{
        role: Role;
        permissions: { key: string; value: string }[];
    }>().props;

    const { register, onSubmit } = useForm({
        permissions: role.permissions.map((permission) => permission.name),
    });

    return (
        <>
            <Breadcrumb
                current="Editar Rol"
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("roles.index"), label: "Roles" },
                ]}
            />

            <Container>
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Editar Rol {role.label}
                        </h1>
                        <p className="text-default-600 mb-4">
                            Modifica la información del rol.
                        </p>
                    </div>

                    <Button
                        variant="flat"
                        color="primary"
                        onClick={onSubmit(
                            "put",
                            route("roles.update", { role })
                        )}
                    >
                        Guardar
                    </Button>
                </div>

                <CheckboxGroup
                    label="Roles"
                    {...register("permissions", "checkbox_group")}
                >
                    <div className="columns-3">
                        {permissions.map(({ key, value }) => (
                            <Checkbox key={key} value={key} className="block">
                                {value}
                            </Checkbox>
                        ))}
                    </div>
                </CheckboxGroup>
            </Container>
        </>
    );
}
