import toast from "react-hot-toast";

export function triggerAlert(
    cb: (
        resolve: (value: unknown) => void,
        reject: (reason?: any) => void
    ) => void,
    data?: { loading?: string; success?: string; error?: string }
) {
    const promise = new Promise(cb);

    const {
        loading = "Enviando...",
        success = "¡Proceso finalizado!",
        error = "Ocurrió un error",
    } = data ?? {};

    toast.promise(promise, { loading, success, error });
}

export function toastAlert(
    message: string,
    type: "success" | "error" | "loading" | "default" = "default"
) {
    toast[type](message);
}
