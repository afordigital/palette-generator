import { RefObject } from "react";
import { IRgba } from "../interfaces";
import { SquareColorPicker, CircleColorPicker } from "./index";
import { ColorPickerShape } from "../ColorPicker";

import ColorPickerServices from "../color-picker.service";

interface IColorPickerFactory {
    create(shape:ColorPickerShape): SquareColorPicker | CircleColorPicker | undefined;
};

export interface IColorPicker {
    onMouseDown(event: React.MouseEvent<HTMLCanvasElement>): IRgba | undefined;
    onMouseMove(event: React.MouseEvent<HTMLCanvasElement>): IRgba | undefined;
    paint(): Promise<void>;
}

export interface ICanvasProperties {
    image?: string;
    rgba?: IRgba;
}

export class ColorPickerFactory implements IColorPickerFactory{
    public constructor(
        private readonly _handlerServices: ColorPickerServices,
        private readonly _canvasRef: RefObject<HTMLCanvasElement>
    ){}

    public create(shape: ColorPickerShape): SquareColorPicker | CircleColorPicker {
        if (shape === "SQUARE") return new SquareColorPicker(this._handlerServices, this._canvasRef);
        if (shape === "CIRCLE") return new CircleColorPicker(this._handlerServices, this._canvasRef);

        return new SquareColorPicker(this._handlerServices, this._canvasRef);
    }
}