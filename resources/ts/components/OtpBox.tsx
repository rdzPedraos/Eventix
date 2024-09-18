import React, {
    ClipboardEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { Input } from "@nextui-org/react";

type Props = {
    value?: string;
    onValueChange?: (value: string) => void;
    length?: number;
    variant?: "flat" | "faded" | "bordered" | "underlined";
    color?: "default" | "primary" | "secondary";

    disabled?: boolean;
    errorMessage?: string;
};

export default function OtpBox({
    value,
    length = 5,
    variant,
    color,
    onValueChange,
    errorMessage,
    disabled,
}: Props) {
    const ref = useRef<HTMLInputElement>(null);
    const [otp, setOtp] = useState(
        value ? value.split("") : Array.from({ length }, () => "")
    );

    const focusInput = (id?: number) => {
        const emptyIndex = otp.findIndex((digit) => !digit);
        let idx = emptyIndex === -1 ? otp.length - 1 : emptyIndex;

        if (id != undefined && id < idx) {
            idx = id < 0 ? 0 : id;
        }

        const input = ref.current.children[idx].querySelector("input");
        input.focus();
    };

    useEffect(() => {
        focusInput();
        onValueChange?.(otp.join(""));
    }, [otp]);

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        const key = e.key;

        switch (key) {
            case "Backspace":
                e.preventDefault();

                const newOtp = [...otp];

                if (newOtp[index]) {
                    newOtp[index] = "";
                } else if (index > 0) {
                    newOtp[index - 1] = "";
                }
                setOtp(newOtp);
                break;

            case "ArrowLeft":
            case "ArrowRight":
                const nextIndex = key === "ArrowLeft" ? index - 1 : index + 1;
                focusInput(nextIndex);
                break;

            default:
                if (/^\d$/.test(key)) {
                    const newOtp = [...otp];
                    newOtp[index] = key;
                    setOtp(newOtp);
                }
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.clipboardData.getData("text").trim();

        if (!/^\d*$/.test(value)) {
            return;
        }

        const newOtp = value.split("").slice(0, otp.length);
        setOtp(newOtp);
    };

    return (
        <div>
            <div className="flex gap-2" ref={ref}>
                {otp.map((digit, index) => (
                    <Input
                        disabled={disabled}
                        key={index}
                        maxLength={1}
                        value={digit}
                        onFocus={() => focusInput(index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        size="lg"
                        variant={variant}
                        color={color}
                        isInvalid={!!errorMessage}
                        classNames={{
                            input: "text-center",
                        }}
                        aria-label={`Dígito ${index + 1} del código OTP`}
                    />
                ))}
            </div>

            {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
        </div>
    );
}
