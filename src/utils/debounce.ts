interface debounceParams {
    callback: () => void;
    delay?: number;
}

let timeout: ReturnType<typeof setTimeout> | null = null;

export function debounce({ callback, delay }: debounceParams): void {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
        callback(); 
    }, delay ?? 100);
}

