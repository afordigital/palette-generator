import { describe, test, vi, beforeEach, expect } from 'vitest';
import { generateAIColor } from './ai-color-generator';
import geminiStore from './gemini-store';
import { waitFor } from '@testing-library/react';

function geminiResponse(color: string) {
    return {
        candidates: [
            {
                content: {
                    parts: [
                        {
                            text: color,
                        }
                    ]
                }
            }
        ]
    };
}


describe('./src/utils/ai-color-generator.ts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    test('should execute HTTP POST request and call the json() method', async () => {
        const color: string = "#42549a";


        JSON.parse= vi.fn();
        JSON.stringify= vi.fn();

        global.fetch = vi.fn(() => Promise.resolve(
            { 
                ok: true, 
                status: 200, 
                json: () => Promise.resolve(geminiResponse(color))
            } as Response
        ));

        const fetchPostSpy = vi.spyOn(global, "fetch");

        const onSuccessMock = vi.fn();
        const onErrorMock = vi.fn();
        const onKeyRequiredMock = vi.fn();
        const prompt: string = "prompt test";
        
        await generateAIColor({
            onKeyRequired: onKeyRequiredMock,
            onSuccess: onSuccessMock,
            onError: onErrorMock,
            prompt
        });

        expect(fetchPostSpy).toHaveBeenCalled();
        expect(onSuccessMock).toHaveBeenCalledWith(color);
    });

    test("should execute the onKeyRequired() method", async () => {

        geminiStore.getApiKey = vi.fn(() => "");

        const onSuccessMock = vi.fn();
        const onErrorMock = vi.fn();
        const onKeyRequiredMock = vi.fn();
        const prompt: string = "prompt test";

        await generateAIColor({
            onKeyRequired: onKeyRequiredMock,
            onSuccess: onSuccessMock,
            onError: onErrorMock,
            prompt
        });

        expect(onKeyRequiredMock).toHaveBeenCalled();
    });

    test("should return an unsuccessful HTTP request", async () => {
        const errorConsoleSpy = vi.spyOn(console,"error");

        global.fetch = vi.fn(() => Promise.resolve(
            { 
                ok: false, 
                status: 500, 
                json: () => Promise.resolve(null)
            } as Response
        ));

        const prompt = "prompt test";

        await generateAIColor({
            onKeyRequired: vi.fn(),
            onSuccess: vi.fn(),
            onError: vi.fn(),
            prompt
        });

        waitFor(() => expect(errorConsoleSpy).toHaveBeenCalled(), { timeout: 200 });
    });

    test("should return an error if the color is invalid", async () => {
        const color: string = "42549a";

        const errorConsoleSpy = vi.spyOn(console,"error");

        JSON.parse= vi.fn();
        JSON.stringify= vi.fn();

        global.fetch = vi.fn(() => Promise.resolve(
            { 
                ok: true, 
                status: 200, 
                json: () => Promise.resolve(geminiResponse(color))
            } as Response
        ));

        const prompt: string = "prompt test";
        
        await generateAIColor({
            onKeyRequired: vi.fn(),
            onSuccess: vi.fn(),
            onError: vi.fn(),
            prompt
        });

        waitFor(() => expect(errorConsoleSpy).toHaveBeenCalled(), { timeout: 200 });
    });
});

