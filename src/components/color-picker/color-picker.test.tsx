import { describe, test, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import ColorPicker from './ColorPicker';
import { HexadecimalContext } from '@/provider/hexadecimal/hexadecimal.context';

export interface IValuesProvider {
  hexColor: string;
  rgbColor: string;
  setHexColor: (hex: string, useDebounce?: boolean) => void;
}

describe('./src/components/color-picker/ColorPicker.tsx', () => { 
  let ref: RenderResult;

  const mockSetHexColor = vi.fn();
  const mockContextValue: IValuesProvider = {
    hexColor: "#FDA12D",
    setHexColor: mockSetHexColor,
    rgbColor: ""
  };

  beforeEach(() => {
    ref = render(
      <HexadecimalContext.Provider value={mockContextValue}>
        <ColorPicker />
      </HexadecimalContext.Provider>
    );
  });

  test('should render two input fields', () => { 
    const allInputs: NodeListOf<HTMLInputElement> = ref.container.querySelectorAll('input');
    expect(allInputs).toHaveLength(2);

    expect(screen.getByPlaceholderText(/#FDA12D/i)).toBeInTheDocument();
  });

  test("should include a color input and a text input", () => {

    const colorInput: Element | null = ref.container.querySelector('input[type="color"]');
    const textInput: Element | null = ref.container.querySelector('input[type="text"]');

    expect(colorInput).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
  });  

  test("should display the initial hex color value", () => {
    const colorInput: HTMLElement = screen.getByLabelText("select a color");
    const textInput: HTMLElement = screen.getByLabelText("type a color or observe the color selected");

    expect(colorInput).toHaveValue(mockContextValue.hexColor.toLowerCase());
    expect(textInput).toHaveValue(mockContextValue.hexColor);
  });

  test("should call setHexColor when the color is changed using the color picker", () => {
    const newColor: string = "#FF5733"; 
    const colorInput: HTMLElement = screen.getByLabelText("select a color");

    fireEvent.change(colorInput, { target: { value: newColor } });

    expect(mockSetHexColor).toHaveBeenCalledWith(newColor.toLowerCase(), true);
  });

  test(" should call setHexColor when the color is changed using the text input", () => {
    const newColor: string = "#00FF00"; 
    const textInput: HTMLElement = screen.getByLabelText("type a color or observe the color selected");

    fireEvent.change(textInput, { target: { value: newColor } });

    expect(mockSetHexColor).toHaveBeenCalledWith(newColor); 
  });
});
