import React from "react";

import { Image, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

import { ActivityCreateFormFields } from "../type";
import { RegisterType } from "@/hooks/useForm";
import { PastelColors } from "@/utils/Colors";
import { Container } from "@/components";
import UploadFile from "@/components/UploadFile";

function renderColorItem(color: (typeof PastelColors)[0]) {
    return (
        <div
            key={color}
            className="w-5 h-5 rounded-full mr-2 border-1 border-opacity-20 border-black"
            style={{ background: color }}
        />
    );
}

type Props = {
    registerInp: RegisterType<ActivityCreateFormFields>;
    errors: Partial<Record<keyof ActivityCreateFormFields, string>>;
    data: ActivityCreateFormFields;
    setImage: (image: File) => void;
};

export default function BasicForm({
    registerInp,
    errors,
    data,
    setImage,
}: Props) {
    const onUpload = (files: FileList) => {
        const file = files[0];
        if (!file) return;

        setImage(file);
    };

    return (
        <Container>
            <form className="flex flex-col gap-4">
                {data.image && (
                    <Image
                        isZoomed
                        height={100}
                        src={data.image}
                        alt="Imagen de la actividad"
                    />
                )}

                <div className="flex justify-start gap-4">
                    <Select
                        aria-label="Color"
                        className="w-20 h-auto"
                        {...registerInp("color", "select")}
                        renderValue={(selected) => [
                            renderColorItem(selected[0].textValue),
                        ]}
                    >
                        {PastelColors.map((color) => (
                            <SelectItem key={color} textValue={color}>
                                {renderColorItem(color)}
                            </SelectItem>
                        ))}
                    </Select>

                    <UploadFile
                        onUpload={onUpload}
                        variant="flat"
                        color="secondary"
                    >
                        Subir foto (opcional)
                    </UploadFile>
                </div>

                {errors.color && (
                    <span className="text-danger">{errors.color}</span>
                )}
                {errors.image && (
                    <span className="text-danger">{errors.image}</span>
                )}

                <Input
                    label="Nombre de la actividad"
                    size="lg"
                    isRequired
                    {...registerInp("name")}
                />

                <Textarea
                    label="Descripción"
                    size="lg"
                    {...registerInp("description")}
                />
            </form>
        </Container>
    );
}
