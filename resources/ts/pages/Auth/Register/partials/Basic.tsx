import React from "react";
import { usePage } from "@inertiajs/react";

import { Input, Select, SelectItem } from "@nextui-org/react";

import { RegisterType } from "@/hooks/useForm";
import { DocumentType } from "@/types/models";

type Props = {
    register: RegisterType<RegisterFormFields>;
};

export default function Basic({ register }: Props) {
    const { documentTypes } = usePage<
        PageProps & {
            documentTypes: DocumentType[];
        }
    >().props;

    return (
        <>
            <p className="mb-4 text-gray-500">
                Ingresa tus datos personales para crear una cuenta en nuestra
                plataforma.
            </p>

            <div className="grid grid-cols-2 gap-4">
                <Select
                    {...register("document_type_code", "select")}
                    label="Tipo de documento"
                    isRequired
                >
                    {documentTypes.map((type) => (
                        <SelectItem key={type.code}>{type.name}</SelectItem>
                    ))}
                </Select>

                <Input
                    {...register("document_number")}
                    label="Número de documento"
                    inputMode="numeric"
                    isRequired
                />

                <Input
                    {...register("phone")}
                    label="Teléfono"
                    inputMode="tel"
                    isRequired
                />

                <Input
                    {...register("email")}
                    type="email"
                    label="Correo electrónico"
                    isRequired
                />

                <Input {...register("name")} label="Nombres" isRequired />
                <Input {...register("last_name")} label="Apellidos" />
            </div>
        </>
    );
}
