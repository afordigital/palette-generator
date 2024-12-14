import { CopyPalette } from '@/components/copy-palette/CopyPalette';
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Toaster } from 'sonner';

import userEvent from '@testing-library/user-event';
import React from 'react';
import * as clipboardMock from '@utils/clipboard';
import { IApiColorPizza } from '@/interfaces/api-color-pizza.interface';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            { children }
            <Toaster />
        </>
    );
};

describe('./src/components/copy-palette/CopyPalette.tsx', () => {  

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

    test("should render a copy button", () => {
        render(<CopyPalette colors={palettesList}/>);

        const copyButton: HTMLElement = screen.getByLabelText(/copy palette/i);

        expect(copyButton).toBeInTheDocument();
    });

    test("should click on it the copy button", async () => {
        const response = await fetch(`https://api.color.pizza/v1/${palettesList[4].color.slice(1)}`);

        const colorsPizzaObject: IApiColorPizza = await response.json();

        global.fetch = vi.fn(() => Promise.resolve(
            { 
                json: () => Promise.resolve(colorsPizzaObject)
            } as Response
        ));

        const clipboardSpy = vi.spyOn(clipboardMock, "clipboard").mockImplementation(vi.fn());

        render(<CopyPalette colors={palettesList}/>, { wrapper: Wrapper });

        const copyButton: HTMLElement = screen.getByLabelText(/copy palette/i);

        await userEvent.click(copyButton);

        const toastMessage: HTMLElement = screen.getByText(/Palette copied correctly! 🐭/i);

        const tailwindGeneratorResponse: string = "{\"100\":\"#e2f5dd\",\"200\":\"#c6ecbb\",\"300\":\"#a9e299\",\"400\":\"#8dd977\",\"500\":\"#70cf55\",\"600\":\"#5aa644\",\"700\":\"#437c33\",\"800\":\"#2d5322\",\"900\":\"#162911\"}";
        expect(clipboardSpy).toHaveBeenCalledWith(tailwindGeneratorResponse);
        
        expect(toastMessage).toBeInTheDocument();

        clipboardSpy.mockClear();
    });
});

