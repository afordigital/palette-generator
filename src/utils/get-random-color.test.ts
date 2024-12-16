import { describe, expect, test, vi } from "vitest";
import { ValidateHexadecimal } from "./hexadecimal-validator";
import { getRandomColor } from "./getRandomColor";

describe('./src/utils/getRandomColor.ts', () => {  
    test("should generate a random color and be valid", () => {
        const randomSpy = vi.spyOn(Math,"random");
        const getColorRandom: string = getRandomColor();

        expect(randomSpy).toHaveBeenCalled();
        expect(ValidateHexadecimal(getColorRandom)).toBeTruthy();
    });
});