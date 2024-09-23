export function debounce(func: Function, delay: number) {
    let timeout;

    return function (...args: any) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
