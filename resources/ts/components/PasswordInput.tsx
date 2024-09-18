import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Input, InputProps } from "@nextui-org/react";
import React, { useState } from "react";

type Props = InputProps;

export default function PasswordInput(props: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            {...props}
            type={isVisible ? "text" : "password"}
            endContent={
                <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                >
                    {isVisible ? (
                        <EyeSlashIcon
                            width={20}
                            className="text-default-400 pointer-events-none"
                        />
                    ) : (
                        <EyeIcon
                            width={20}
                            className="text-default-400 pointer-events-none"
                        />
                    )}
                </button>
            }
        />
    );
}
