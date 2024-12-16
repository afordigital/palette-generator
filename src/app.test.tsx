import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { Toaster } from "sonner";
import { SavePalette } from './components/save-palette/SavePalette';
import { Footer } from './sections/footer/Footer';

import App from './App';
import ColorPicker from './components/color-picker/ColorPicker';
import Palette from './components/palette/Palette';
import GraphicItems from './components/graphic-items/GraphicItems';
import SavePaletteSection from './sections/save-palette-section/SavePaletteSection';
import PromptDialog from './components/prompt-dialog/PromptDialog';

vi.mock("sonner", () => ({
    Toaster: vi.fn(() => (
        <div>
            <p>Toaster</p>
        </div>
    ))
}));

vi.mock("./components/color-picker/ColorPicker.tsx", () => ({
    default: vi.fn(),
    Toaster: vi.fn(() => (
        <div>
            <p>ColorPicker</p>
        </div>
    ))
}));

vi.mock("./components/save-palette/SavePalette.tsx", () => ({
    SavePalette: vi.fn(() => (
        <div>
            <p>SavePalette</p>
        </div>
    ))
}));

vi.mock("./components/palette/Palette.tsx", () => ({
    default: vi.fn(),
    Palette: vi.fn(() => (
        <div>
            <p>Palette</p>
        </div>
    ))
}));

vi.mock("./components/graphic-items/GraphicItems.tsx", () => ({
    default: vi.fn(),
    GraphicItems: vi.fn(() => (
        <div>
            <p>GraphicItems</p>
        </div>
    ))
}));

vi.mock("./sections/save-palette-section/SavePaletteSection.tsx", () => ({
    default: vi.fn(),
    SavePaletteSection: vi.fn(() => (
        <div>
            <p>SavePaletteSection</p>
        </div>
    ))
}));

vi.mock("./components/prompt-dialog/PromptDialog.tsx", () => ({
    default: vi.fn(),
    PromptDialog: vi.fn(() => (
        <div>
            <p>PromptDialog</p>
        </div>
    ))
}));

vi.mock("./sections/footer/Footer.tsx", () => ({
    Footer: vi.fn(() => (
        <div>
            <p>Footer</p>
        </div>
    ))
}));

describe('./src/App.tsx', () => {

    beforeAll(() => {
        // These properties were mocked because they are objects from the browser.
        // Node.js does not recognize these objects, which causes errors to be thrown.

        Object.defineProperty(global, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
              matches: false,
              media: query,
              onchange: null,
              addListener: vi.fn(),
              removeListener: vi.fn(), 
              addEventListener: vi.fn(),
              removeEventListener: vi.fn(),
              dispatchEvent: vi.fn(),
            })),
          });

        global.ResizeObserver = vi.fn().mockImplementation(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        Object.defineProperty(console, "warn", { value: vi.fn() });
    });

    test('should render a title', () => {
        render(<App />);

        const title: HTMLElement = screen.getByText(/Generate your Custom Palette/i);

        expect(title).toBeInTheDocument();
    });

    test("should render the Toaster component", () => {
        render(<App />);

        expect(Toaster).toHaveBeenCalled();
    });

    test("should render the ColorPicker component", () => {
        render(<App />);

        expect(ColorPicker).toHaveBeenCalled();
    });

    test("should render the SavePalette component", () => {
        render(<App />);

        expect(SavePalette).toHaveBeenCalled();
    });

    test("should render the Palette component", () => {
        render(<App />);

        expect(Palette).toHaveBeenCalled();
    });
    
    test("should render a button to generate a random color", () => {
        render(<App />);

        const generateRandomColorBtn: HTMLElement = screen.getByRole("button", { name: /Generate Random/i });

        expect(generateRandomColorBtn).toBeInTheDocument();
    });

    test("should render a button to generate a color using AI", () => {
        render(<App />);

        const generateColorWithIaBtn: HTMLElement = screen.getByRole("button", { name: /Generate with AI/i });

        expect(generateColorWithIaBtn).toBeInTheDocument();
    });

    test("should render the GraphicItems component", () => {
        render(<App />);

        expect(GraphicItems).toHaveBeenCalled();
    });

    test("should render the SavePaletteSection component", () => {
        render(<App />);

        expect(SavePaletteSection).toHaveBeenCalled();
    });

    test("should render the PromptDialog component", () => {
        render(<App />);

        expect(PromptDialog).toHaveBeenCalled();
    });

    test("should render the Footer component", () => {
        render(<App />);

        expect(Footer).toHaveBeenCalled();
    });
});