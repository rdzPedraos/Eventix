import React, { useMemo } from "react";
import { usePage } from "@inertiajs/react";

import { Input, Select, SelectItem } from "@nextui-org/react";
import { PageProps } from "@/utils/PageProps";

import { RegisterType } from "@/hooks/useForm/types";
import { Country, DocumentType } from "@/types/models";

type Props = {
    register: RegisterType;
    data: {
        country_iso_code: string;
    };
};

export default function Basic({ register, data }: Props) {
    const { countries, documentTypes } = usePage<
        PageProps & {
            countries: Country[];
            documentTypes: DocumentType[];
        }
    >().props;

    const filterDocumentTypes = useMemo(() => {
        return documentTypes.filter(
            (type) => type.country_iso_code === data.country_iso_code
        );
    }, [data]);

    return (
        <>
            <p className="mb-4 text-gray-500">
                Ingresa tus datos personales para crear una cuenta en nuestra
                plataforma.
            </p>

            <div className="grid grid-cols-2 gap-4">
                <Select
                    {...register("country_iso_code", "select")}
                    label="País"
                    className="col-span-2"
                    isRequired
                >
                    {countries.map((country) => (
                        <SelectItem key={country.iso_code}>
                            {country.name}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    {...register("document_type_code", "select")}
                    label="Tipo de documento"
                    isDisabled={!data.country_iso_code}
                    isRequired
                >
                    {filterDocumentTypes.map((type) => (
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
