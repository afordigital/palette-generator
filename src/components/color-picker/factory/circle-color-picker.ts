import circleColorPalette  from '@public/circle-color-palette.png';

import { RefObject } from "react";
import { IRgba } from "../interfaces";
import { ICanvasProperties, IColorPicker } from "./factory";
import ColorPickerServices from '../color-picker.service';


export class CircleColorPicker implements IColorPicker{
    // private linearGradientColorPicker!: CanvasGradient | undefined;

    private _image: HTMLImageElement = new Image(250, 250);

    private _circleContext!: CanvasRenderingContext2D | undefined | null;

    public properties: ICanvasProperties = {
        image: circleColorPalette,
        rgba: {
            red: 255,
            green: 255,
            blue: 255,
            opacity: 1
        }
    };

    public constructor(
        private readonly _handlerServices: ColorPickerServices,
        private readonly _canvasRef: RefObject<HTMLCanvasElement>,
    ) {
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    private createCircleColorPicker():void{
        this._circleContext = this._canvasRef.current?.getContext("2d", { willReadFrequently: true });
        this._image.onload = () => this._handlerServices.onLoadImage(this._circleContext!, this._image);
        this._image.src = this.properties.image!;
    }

    public onMouseDown(event: React.MouseEvent<HTMLCanvasElement>): IRgba | undefined {
        const rgba = this._handlerServices.updateColorColorPicker(event, this._circleContext!, this._canvasRef);

        this.properties = {
            ...this.properties,
            rgba
        };

        return rgba;
    }

    public onMouseMove(event: React.MouseEvent<HTMLCanvasElement>): IRgba | undefined {
        const rgba: IRgba = this._handlerServices.updateColorColorPicker(event, this._circleContext!, this._canvasRef);

        this.properties = {
            image: "",
            ...this.properties
        };

        return rgba;
    }

    public paint(): Promise<void> {
        return new Promise((resolve) => {
            this.createCircleColorPicker();
            resolve();
        });
    }
}