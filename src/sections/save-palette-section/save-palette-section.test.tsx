import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import store, { Palette, Palettes } from "@/utils/palettes";

import SavePaletteSection from "./SavePaletteSection";

describe('./src/sections/save-palette-section/save-palette-section.test.tsx', () => { 
    const palettes: Palettes = { 
        "dark-river": {
            100: "#d8d9d9",
            200: "#b2b4b4",
            300: "#8b8e8e",
            400: "#656969",
            500: "#3e4343",
            600: "#323636",
            700: "#252828",
            800: "#191b1b",
            900: "#0c0d0d"
        } as Palette
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    test("should have a text called Saved Palettes", () => {
        store.getSnapshot = vi.fn(() => palettes);

        render(<SavePaletteSection />);

        vi.useFakeTimers({ advanceTimeDelta: 200 });

        const paragraphSavePalette: HTMLElement = screen.getByText(/Saved Palettes/i);

        expect(paragraphSavePalette).toBeInTheDocument();
    });

    test("should contain an h4 with the text Dark River", () => {
        render(<SavePaletteSection />);

        const paletteNameInput: HTMLElement = screen.getByRole("heading", { level: 2 });

        expect(paletteNameInput).toBeInTheDocument();
    });

    test("should have the following button options: delete, edit, copy", () => {
        render(<SavePaletteSection />);

        // the test where buttons are click on it are in su respective test file
        const copyButton = screen.getByLabelText(/copy palette/i);
        const deleteButton = screen.getByLabelText(/delete palette/i);
        const editButton =  screen.getByLabelText(/edit palette/i);

        expect(copyButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();

        const editIcon: Element = editButton.getElementsByClassName("lucide lucide-square-pen")[0];
        const copyIcon: Element = copyButton.getElementsByClassName("lucide lucide-copy")[0];
        const deleteIcon: Element = deleteButton.getElementsByClassName("lucide lucide-trash2")[0];

        expect(editIcon).toBeInTheDocument();
        expect(deleteIcon).toBeInTheDocument();
        expect(copyIcon).toBeInTheDocument();
    });

    test("should contain all the colors of the palette", () => {
        render(<SavePaletteSection/>);

        const getLittlePalette: HTMLElement = screen.getByLabelText("little-palette", { exact: true });

        const buttons: number = getLittlePalette.querySelectorAll("button").length;
        const getPalettes: number = Object.keys(palettes["dark-river"]).length;

        // If the count of palettes is equal to the number of buttons, it means the palettes were rendered.
        expect(buttons).toBe(getPalettes);
    });

    // i could be a test when user do click on on the button but is not necessary because the little palette is a component too.
    // then i could make a test independent for LittlePalette component.
});

