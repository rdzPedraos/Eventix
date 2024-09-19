import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { route } from "@ziggyjs";

import useForm from "@/hooks/useForm";
import { triggerConfetti } from "@/utils/Confetti";

export default function hook() {
    const { register, submit, data, setErrors, setData } =
        useForm<RegisterFormFields>({} as RegisterFormFields);

    const [otpStatus, setOtpStatus] = useState<"empty" | "sent" | "verified">(
        "empty"
    );

    useEffect(() => setOtpStatus("empty"), [data.email, data.document_number]);

    const sendOtp = async (force = false) => {
        if (otpStatus !== "empty" && !force) return true;

        const response = await axios
            .post(route("otp.send"), {
                document_number: data.document_number,
                source: data.email,
                channel: "email",
            })
            .catch((error) => {
                return error.response;
            });

        if (response.status === 200) {
            setOtpStatus("sent");
            return true;
        }

        setErrors(response.data.errors, { source: "email" });
        return false;
    };

    const verifyOtp = async () => {
        if (otpStatus === "verified") return true;

        const response = await axios
            .post(route("otp.verify"), {
                document_number: data.document_number,
                source: data.email,
                channel: "email",
                otp: data.otp,
            })
            .catch((error) => {
                return error.response;
            });

        if (response.status === 200) {
            const { token } = response.data;
            setData("verify_otp", token);
            setOtpStatus("verified");
            return true;
        }

        setErrors(response.data.errors, { source: "email" });
        return false;
    };

    const verifyPassword = () => {
        if (data.password !== data.verify_password) {
            setErrors({
                verify_password: "Las contraseñas no coinciden",
            });
            return false;
        }

        return true;
    };

    const onSubmit = () => {
        const promise = new Promise((resolve, reject) => {
            submit("post", route("register.store"), {
                onSuccess: () => triggerConfetti(),
                onError: reject,
                onFinish: resolve,
            });
        });

        toast.promise(promise, {
            loading: "Registrando...",
            success: "¡Registro exitoso!",
            error: "Hubo un error en el registro, se han dejado anotaciones en los campos",
        });
    };

    return {
        register,
        data,
        otpStatus,
        sendOtp,
        verifyOtp,
        verifyPassword,
        onSubmit,
    };
}
