import { describe, expect, test, vi } from 'vitest';
import { useContext } from 'react';
import { HexadecimalContext } from './hexadecimal.context';
import { render, screen } from '@testing-library/react';

import * as getRandomColorMock from "@utils/getRandomColor";
import HexadecimalProvider from './Hexadecimal';
import userEvent from '@testing-library/user-event';

const TestComponent = ({ newColor }: { newColor: string }) => {
    const provider = useContext(HexadecimalContext);

    return (
        <>
            <button data-testid='btn1'>{provider.hexColor}</button>
            <button data-testid='btn2' onClick={() => provider.setHexColor(newColor)}>Change Color</button>
        </>
    );
};

const Wrapper = ({ newColor }: { newColor: string }) => {
    return (
        <HexadecimalProvider>
            <TestComponent newColor={newColor}/>
        </HexadecimalProvider>
    );
};

describe('./src/provider/hexadecimal/Hexadecimal.tsx', () => {
    test('should verify that hexColor and setHexColor exist', async () => {
        const randomColor: string = getRandomColorMock.getRandomColor();

        const getRandomColorSpy = vi.spyOn(getRandomColorMock, "getRandomColor");
        getRandomColorSpy.mockImplementation(() => randomColor);

        const newColor: string = "#e7ccb2";

        render(<Wrapper newColor={newColor}/>);

        const btn1: HTMLElement = screen.getByTestId("btn1");
        const btn2: HTMLElement = screen.getByTestId("btn2");

        // the first color is a random
        expect(btn1.textContent).toEqual(randomColor);

        // when the second button is click it on, then change the color to the newColor
        await userEvent.click(btn2);

        expect(btn1.textContent).toEqual(newColor);
        expect(getRandomColorSpy).toHaveBeenCalled();
    });
});