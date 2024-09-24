import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative bg-white shadow border-1 rounded-xl p-5 mx-4">
            {children}
        </div>
    );
}
