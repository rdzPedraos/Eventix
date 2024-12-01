import React, { useEffect } from "react";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { DatePicker, Link, Select, SelectItem } from "@nextui-org/react";
import { route } from "@ziggyjs";

import { useFormCreateContext } from "../context";
import { Container, EditableContent } from "@/components";

export default function QuestionHeader() {
    const { data, setData, register, triggerTypes } = useFormCreateContext();

    useEffect(() => {
        if (data.published_trigger != "custom") {
            setData("trigger_date", null);
        }
    }, [data.published_trigger]);

    return (
        <>
            <Container>
                <div className="flex gap-4">
                    <Select
                        label="Tipo de disparador"
                        {...register("published_trigger", "select")}
                    >
                        {triggerTypes.map((trigger) => (
                            <SelectItem key={trigger.key} value={trigger.key}>
                                {trigger.value}
                            </SelectItem>
                        ))}
                    </Select>

                    <DatePicker
                        label="Fecha de lanzamiento"
                        isDisabled={data.published_trigger != "custom"}
                        {...register("trigger_date", "date")}
                    />
                </div>
            </Container>

            <Container>
                <Link
                    className="mb-2 text-sm hover:underline"
                    target="_blank"
                    href={route("activities.edit", {
                        activity: data.activity_id,
                    })}
                >
                    <ArrowLongLeftIcon width={20} />
                    Ver actividad
                </Link>

                <EditableContent
                    {...register("name", "editable_content")}
                    className="text-2xl font-bold w-full"
                    placeholder="Título del formulario"
                />

                <EditableContent
                    {...register("description", "editable_content")}
                    className="text-gray-600 w-full"
                    placeholder="Descripción del formulario"
                />
            </Container>
        </>
    );
}
