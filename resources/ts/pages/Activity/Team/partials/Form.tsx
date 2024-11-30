import React from "react";
import { Button, Input } from "@nextui-org/react";
import useForm from "@/hooks/useForm";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { route } from "@ziggyjs";
import { usePage } from "@inertiajs/react";

type Props = {};

export default function Form({}: Props) {
    const { activity } = usePage().props;
    const { register, onSubmit } = useForm<{
        document_number: string;
    }>({ document_number: "" });

    return (
        <form
            className="flex gap-4 items-stretch"
            onSubmit={onSubmit(
                "post",
                route("activities.team.store", { activity })
            )}
        >
            <Input
                {...register("document_number")}
                label="Número de documento del usuario"
                className="max-w-lg"
                endContent={
                    <Button
                        type="submit"
                        variant="light"
                        color="primary"
                        isIconOnly
                        endContent={<UserPlusIcon width={20} />}
                    />
                }
            />
        </form>
    );
}
