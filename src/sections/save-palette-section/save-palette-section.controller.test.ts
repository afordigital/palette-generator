import { describe, expect, test } from 'vitest';
import { IPalettes, SavePaletteSectionController } from './save-palette-section.controller';
import { Palette } from '@/utils/palettes';

describe('./src/sections/save-palette-section/save-palette-section.controller.ts', () => {
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


    const controller: SavePaletteSectionController = new SavePaletteSectionController();

    test('should return a list of palettes from the copyPaletteColors() method', () => {
        const palettesCopied: IPalettes[] = controller.copyPaletteColors(palettes);
        
        expect(palettesCopied).toEqual([
            { color: '#d8d9d9', text: '#191919' },
            { color: '#b2b4b4', text: '#191919' },
            { color: '#8b8e8e', text: '#191919' },
            { color: '#656969', text: '#FEFDFC' },
            { color: '#3e4343', text: '#FEFDFC' },
            { color: '#323636', text: '#FEFDFC' },
            { color: '#252828', text: '#FEFDFC' },
            { color: '#191b1b', text: '#FEFDFC' },
            { color: '#0c0d0d', text: '#FEFDFC' }
        ]);
    });

    test("should return a list of palettes from the littlePaletteColors() method", () => {
        const littlePalettes: IPalettes[] = controller.littlePaletteColors(palettes);
        
        expect(littlePalettes).toEqual([
            { color: '#d8d9d9', text: '#191919' },
            { color: '#b2b4b4', text: '#191919' },
            { color: '#8b8e8e', text: '#191919' },
            { color: '#656969', text: '#FEFDFC' },
            { color: '#3e4343', text: '#FEFDFC' },
            { color: '#323636', text: '#FEFDFC' },
            { color: '#252828', text: '#FEFDFC' },
            { color: '#191b1b', text: '#FEFDFC' },
            { color: '#0c0d0d', text: '#FEFDFC' }
        ]);
    });
});