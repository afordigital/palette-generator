interface debounceParams {
    callback: () => void;
    delay?: number;
}

export function debounce({ callback, delay }: debounceParams): void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (!timeout) clearTimeout(timeout!);

    timeout = setTimeout(() => {
        // callback is if you want to pass a functionality to execute
        callback!();
    }, delay ?? 100);
}

