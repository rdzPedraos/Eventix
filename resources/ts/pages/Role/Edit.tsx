import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { Button, Checkbox, CheckboxGroup, Input } from "@nextui-org/react";

import { Role } from "@/types/models";
import useForm from "@/hooks/useForm";
import { Breadcrumb, Container } from "@/components";

export default function Edit() {
    const { role, permissions } = usePage<{
        role: Role;
        permissions: { key: string; value: string }[];
    }>().props;

    const { register, onSubmit } = useForm({
        name: role.name,
        permissions: role.permissions.map((permission) => permission.name),
    });

    const submit = role.id
        ? onSubmit("put", route("roles.update", { role }))
        : onSubmit("post", route("roles.store"));

    return (
        <>
            <Breadcrumb
                current="Editar Rol"
                items={[
                    { to: route("home"), label: "Calendario" },
                    { to: route("roles.index"), label: "Roles" },
                ]}
            />

            <div className="flex flex-col gap-4">
                <Container>
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold">
                                Editar Rol
                            </h1>
                            <p className="text-default-600 mb-4">
                                Modifica la información del rol.
                            </p>
                        </div>

                        <Button variant="flat" color="primary" onClick={submit}>
                            Guardar
                        </Button>
                    </div>
                </Container>

                <Container>
                    <Input
                        className="max-w-lg mb-4"
                        size="lg"
                        label="Nombre"
                        {...register("name")}
                    />

                    <CheckboxGroup
                        label="Roles"
                        {...register("permissions", "checkbox_group")}
                    >
                        <div className="columns-3">
                            {permissions.map(({ key, value }) => (
                                <Checkbox
                                    key={key}
                                    value={key}
                                    className="block"
                                >
                                    {value}
                                </Checkbox>
                            ))}
                        </div>
                    </CheckboxGroup>
                </Container>
            </div>
        </>
    );
}
