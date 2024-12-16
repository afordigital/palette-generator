
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { SavePalette } from './SavePalette';
import * as tailwindGeneratorMock from "@lib/tailwindGenerator";

import userEvent from '@testing-library/user-event';
import { Palette } from '@/utils/palettes';

describe('Indicate the directory of the file to test', () => {
    const palettesList = [
        { color: '#e2f5dd', text: '#191919' },
        { color: '#c6ecbb', text: '#191919' },
        { color: '#a9e299', text: '#191919' },
        { color: '#8dd977', text: '#191919' },
        { color: '#70cf55', text: '#191919' },
        { color: '#5aa644', text: '#191919' },
        { color: '#437c33', text: '#FEFDFC' },
        { color: '#2d5322', text: '#FEFDFC' },
        { color: '#162911', text: '#FEFDFC' }
    ];

    const colors: Palette = {
        '100': '#e2f5dd',
        '200': '#c6ecbb',
        '300': '#a9e299',
        '400': '#8dd977',
        '500': '#70cf55',
        '600': '#5aa644',
        '700': '#437c33',
        '800': '#2d5322',
        '900': '#162911'
    };

    test('should render a save button', () => {
        render(<SavePalette colors={palettesList} action={vi.fn()}/>);

        const saveBtn: HTMLElement = screen.getByText(/Save Palette/i);

        expect(saveBtn).toBeInTheDocument();
    });

    test("should handle the click of save button", async () =>{
        const actionMock = vi.fn();

        const colorName: string = "test-done-with-testing-library";
        
        vi.spyOn(tailwindGeneratorMock, "tailwindGenerator").mockImplementation(() => Promise.resolve([ colorName, colors ]));

        render(<SavePalette colors={palettesList} action={actionMock}/>);

        const saveBtn: HTMLElement = screen.getByText(/Save Palette/i);

        await userEvent.click(saveBtn);

        expect(actionMock).toHaveBeenCalledWith(colorName,colors);
    });
});