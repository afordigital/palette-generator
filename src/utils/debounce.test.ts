import { describe, expect, test, vi } from "vitest";
import { debounce } from "./debounce";

describe('./src/utils/debounce.ts', () => {  
    test("should be a function", () => {
        expect(typeof debounce).toBe('function');
    });

    test("should be called with a callback and a delay", () => {
        const callback = vi.fn();
        const debounceSpy = vi.fn(debounce);

        debounceSpy({ callback, delay: 1000 });

        expect(debounceSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                callback: expect.any(Function),
                delay: 1000,
            })
        );
    });

    test("should execute the callback after the delay", () => {
        vi.useFakeTimers();
        const callback = vi.fn();
        const timeout: number = 1000;

        debounce({ callback, delay: timeout });

        expect(callback).not.toHaveBeenCalled();

        vi.advanceTimersByTime(timeout);

        expect(callback).toHaveBeenCalledTimes(1);

        vi.useRealTimers(); 
    });
});