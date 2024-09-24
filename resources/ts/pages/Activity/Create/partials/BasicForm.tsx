import React from "react";

import { Image, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

import { PastelColors } from "@/utils/Colors";
import { Container } from "@/components";
import UploadFile from "@/components/UploadFile";
import { useActivityCreateContext } from "../context";

function renderColorItem(color: (typeof PastelColors)[0]) {
    return (
        <div
            key={color}
            className="w-5 h-5 rounded-full mr-2 border-1 border-opacity-20 border-black"
            style={{ background: color }}
        />
    );
}

export default function BasicForm() {
    const { register, errors, data, saveImage } = useActivityCreateContext();

    const onUpload = (files: FileList) => {
        const file = files[0];
        if (!file) return;

        saveImage(file);
    };

    return (
        <Container>
            <div className="flex flex-col gap-4">
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
                        {...register("color", "select")}
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
                    {...register("name")}
                />

                <Textarea
                    label="Descripción"
                    size="lg"
                    {...register("description")}
                />
            </div>
        </Container>
    );
}
