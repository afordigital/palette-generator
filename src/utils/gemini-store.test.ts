import { afterAll, describe, expect, test, vi } from "vitest";
import { Env } from "@/constants/env";

import geminiStore from "./gemini-store";

describe('src/utils/gemini-store.ts', () => {  
    const localstorageField: string = "gemini_api_key";

    afterAll(() => {
        localStorage.removeItem(localstorageField);
    });

    test("Should have getApiKey, setApiKey and a subscribe functions", () => {
        expect(typeof geminiStore.getApiKey).toBe("function");
        expect(typeof geminiStore.setApiKey).toBe("function");
        expect(typeof geminiStore.subscribe).toBe("function");
    });    

    test("should return VITE_GEMINI_API_KEY environment variable from the getApiKey function", () => {
        expect(geminiStore.getApiKey()).toBe(Env.VITE_GEMINI_API_KEY);
    });

    test("should save the VITE_GEMINI_API_KEY in the localstorage", () => { 
        const setItemSpy = vi.spyOn(Storage.prototype, "setItem"); 
        geminiStore.setApiKey(Env.VITE_GEMINI_API_KEY); 
        expect(setItemSpy).toHaveBeenCalledTimes(1); 
        setItemSpy.mockClear();
    });

    test("should save the VITE_GEMINI_API_KEY in the localstorage", () => {
        const getApiKey = localStorage.getItem(localstorageField);

        expect(getApiKey).toBe(Env.VITE_GEMINI_API_KEY);
    });
});