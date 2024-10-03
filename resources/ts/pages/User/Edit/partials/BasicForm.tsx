import React from "react";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";
import { InboxIcon } from "@heroicons/react/24/solid";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

import { DocumentType, User } from "@/types/models";
import useForm from "@/hooks/useForm";
import { triggerAlert } from "@/utils";

type Props = {};

export default function BasicForm({}: Props) {
    const { user, documentTypes } = usePage<{
        user: User;
        documentTypes: DocumentType[];
    }>().props;

    const { register, submit } = useForm<User>(user);
    const onSave = () => {
        triggerAlert(
            (resolve, reject) => {
                submit("put", route("users.update", { user: user.id }), {
                    onSuccess: resolve,
                    onError: reject,
                });
            },
            {
                success: "Datos actualizados correctamente",
            }
        );
    };

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Datos básicos</h1>
                    <p className="text-default-600 mb-4">
                        Actualiza tus datos básicos en esta sección.
                    </p>
                </div>

                <Button
                    color="primary"
                    variant="flat"
                    onClick={onSave}
                    endContent={<InboxIcon width={20} />}
                >
                    Guardar
                </Button>
            </div>

            <form>
                <div className="flex gap-4 mb-4">
                    <Input label="Nombres" isRequired {...register("name")} />

                    <Input label="Apellidos" {...register("last_name")} />
                </div>

                <div className="flex gap-4">
                    <Select
                        label="Tipo de documento"
                        isRequired
                        {...register("document_type_code", "select")}
                    >
                        {documentTypes.map((type) => (
                            <SelectItem key={type.code}>{type.name}</SelectItem>
                        ))}
                    </Select>

                    <Input
                        label="Número de documento"
                        isRequired
                        {...register("document_number")}
                    />

                    <Input label="Teléfono" isRequired {...register("phone")} />
                </div>
            </form>
        </>
    );
}
