import { render } from "@testing-library/react";
import { beforeAll, describe, expect, test, vi } from "vitest";

import GraphicItems from "./GraphicItems";
import { CardComponent } from "../shared/items/Card";
import { SliderComponent } from "../shared/items/SliderComponent";
import { CheckboxComponent } from "../shared/items/Checkbox";
import { AlertComponent } from "../shared/items/AlertComponent";

vi.mock("@/components/shared/items/Card.tsx", () => ({
    CardComponent: vi.fn((props) => (
        <div style={{ color: props.color }}>
            CardComponentMocks
        </div>
    )),
}));

vi.mock("@/components/shared/items/SliderComponent.tsx", () => ({
    SliderComponent: vi.fn((props) => (
        <div style={{ color: props.color }}>
            SliderComponentMock
        </div>
    )),
}));

vi.mock("@/components/shared/items/Checkbox.tsx", () => ({
    CheckboxComponent: vi.fn((props) => (
        <div style={{ color: props.color }}>
            CheckboxComponentMock
        </div>
    )),
}));

vi.mock("@/components/shared/items/AlertComponent.tsx", () => ({
    AlertComponent: vi.fn((props) => (
        <div style={{ color: props.color }}>
            AlertComponentMock
        </div>
    ))
}));

describe('./src/components/graphic-items/GraphicItems.tsx', () => {  
    beforeAll(() => {
        class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        }
        
        global.ResizeObserver = ResizeObserver;

        // The GraphicItems component return a warn requiring a width and a height then the warn method were silenced
        Object.assign(console, {
            warn: vi.fn()
        });
    });

    test("should call CardComponent with correct props", () => {
        const color = "#10feb0";

        render(<GraphicItems color={color}/>);

        expect(CardComponent).toHaveBeenCalledWith(
            expect.objectContaining({ color }),
            expect.anything()
        );

        expect(SliderComponent).toHaveBeenCalledWith(
            expect.objectContaining({ color }),
            expect.anything()
        );

        expect(CheckboxComponent).toHaveBeenCalledWith(
            expect.objectContaining({ color }),
            expect.anything()
        );

        expect(AlertComponent).toHaveBeenCalled();

        vi.clearAllMocks();
    });
});
