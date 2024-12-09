import { render, } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Palette } from "@/utils/palettes";
import { IPalettes, SavePaletteSectionController } from "@/sections/save-palette-section/save-palette-section.controller";

import useEvent from "@testing-library/user-event";
import LittlePalette from "./LittlePalette";
import { toast } from "sonner";
import { clipboard } from "@/utils/clipboard";

vi.mock("@utils/clipboard.ts", () => ({
    clipboard: vi.fn()
}));

vi.mock("sonner", () => ({
    toast: vi.fn()
}));

describe('./src/components/little-palette/LittlePalette.tsx', () => {
    // The test that verifies if the colors were shown is in ./src/sections/save-palette-section.test.tsx

    const controller: SavePaletteSectionController = new SavePaletteSectionController();

    const palettes: Palette = {
        "100": "#d8d9d9",
        "200": "#b2b4b4",
        "300": "#8b8e8e",
        "400": "#656969",
        "500": "#3e4343",
        "600": "#323636",
        "700": "#252828",
        "800": "#191b1b",
        "900": "#0c0d0d",
    };

    test("should copy the color when the user clicks on it the TooltipTrigger component", async () => {
        const colors: IPalettes[] = controller.littlePaletteColors(palettes);

        // they are 9 element then you can click on each of them using the index
        // remember start from 0 to 8 and 8 it's 9
        
        const colorIndex: number = 4;
    
        const { container } = render(<LittlePalette colors={colors}/>);

        const buttons = container.querySelectorAll("button");

        await useEvent.click(buttons[colorIndex]);

        expect(clipboard).toHaveBeenCalled();
        expect(toast).toHaveBeenCalled();
    });
});