export * from "./Alerts";
export * from "./Colors";
export * from "./Confetti";
export * from "./Text";

export function debounce(callback: (...args: any[]) => void, wait: number) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), wait);
    };
}
