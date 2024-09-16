import React from "react";
import { useForm } from "@/hooks/useForm";
import { Button, Input } from "@nextui-org/react";

type Props = {};

export default function Login({}: Props) {
    const { register, onSubmit, errors } = useForm({
        email: "",
        password: "",
    });

    return (
        <div>
            <form onSubmit={onSubmit("post", "login")}>
                {errors.email && <div>{errors.email}</div>}

                <Input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                />

                <Input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
}

Login.layout = null;
