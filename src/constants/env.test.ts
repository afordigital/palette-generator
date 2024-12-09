import { describe, expect, test } from 'vitest';
import { Env } from './env';


describe('./src/constants/env.ts', () => {
    // this environment variables are of testing not of production
    test("should ensure that environment variables are not empty", () => {
        expect(Env.VITE_API_COLOR_PIZZA.length).not.lessThan(3);
        expect(Env.VITE_GEMINI_API_KEY.length).not.lessThan(3);
        expect(Env.VITE_GEMINI_URL.length).not.lessThan(3);
    });
});