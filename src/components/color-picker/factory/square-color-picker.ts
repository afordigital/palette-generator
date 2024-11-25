import { RefObject } from "react";
import { ICanvasProperties, IColorPicker } from "./factory";
import ColorPickerServices from "../color-picker.service";
import { IRgba } from "../interfaces";

export class SquareColorPicker implements IColorPicker{
    private linearGradientColorPicker!: CanvasGradient | undefined;

    public constructor(
        private readonly _handlerServices: ColorPickerServices,
        private readonly _canvasRef: RefObject<HTMLCanvasElement>
    ) {
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    public properties: ICanvasProperties = {
        rgba: {
            red: 255,
            green: 255,
            blue: 255,
            opacity: 1
        }
    };

    private _squareContext!: CanvasRenderingContext2D | undefined | null;

    private _createGradientColors(): void {
        this._squareContext = this._canvasRef.current?.getContext("2d", { willReadFrequently: true });
        this.linearGradientColorPicker = this._squareContext?.createLinearGradient(0, 0, this._canvasRef.current!.width, 0);
        this.linearGradientColorPicker!.addColorStop(0, '#ff0000');
        this.linearGradientColorPicker!.addColorStop(1 / 6, '#ffff00');
        this.linearGradientColorPicker!.addColorStop((1 / 6) * 2, '#00ff00');
        this.linearGradientColorPicker!.addColorStop((1 / 6) * 3, '#00ffff');
        this.linearGradientColorPicker!.addColorStop((1 / 6) * 4, '#0000ff');
        this.linearGradientColorPicker!.addColorStop((1 / 6) * 5, '#ff00ff');
        this.linearGradientColorPicker!.addColorStop(1, '#ff0000');
        this._squareContext!.fillStyle = this.linearGradientColorPicker!;
        this._squareContext?.fillRect(0, 0, this._canvasRef.current!.width, this._canvasRef.current!.height);
    }

    private _createGradientColorsPicker(): void {
        this.linearGradientColorPicker = this._squareContext!.createLinearGradient(0, 0, 0, this._canvasRef.current!.height);
        this.linearGradientColorPicker!.addColorStop(0, 'rgba(255, 255, 255, 1)');
        this.linearGradientColorPicker!.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        this.linearGradientColorPicker!.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this._squareContext!.fillStyle = this.linearGradientColorPicker;
        this._squareContext!.fillRect(0, 0, this._canvasRef.current!.width, this._canvasRef.current!.height);
    }

    private _createGradientColorOpacity(): void {
        this.linearGradientColorPicker = this._squareContext!.createLinearGradient(0, 0, 0, this._canvasRef.current!.height);
        this.linearGradientColorPicker!.addColorStop(0, 'rgba(0, 0, 0, 0)');
        this.linearGradientColorPicker!.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        this.linearGradientColorPicker!.addColorStop(1, 'rgba(0, 0, 0, 1)');
        this._squareContext!.fillStyle = this.linearGradientColorPicker;
        this._squareContext!.fillRect(0, 0, this._canvasRef.current!.width, this._canvasRef.current!.height);
    }

    public onMouseDown(event: React.MouseEvent<HTMLCanvasElement>): IRgba | undefined {
        const rgba = this._handlerServices.updateColorColorPicker(event, this._squareContext!, this._canvasRef);

        this.properties = {
            ...this.properties,
            rgba
        };

        return rgba;
    }

    public onMouseMove(event: React.MouseEvent<HTMLCanvasElement>): IRgba | undefined {
        const rgba: IRgba = this._handlerServices.updateColorColorPicker(event, this._squareContext!, this._canvasRef);

        this.properties = {
            ...this.properties,
            rgba
        };

        return rgba;
    }

    public paint(): Promise<void> {
        return new Promise((resolve) => {
            this._createGradientColors();
            this._createGradientColorsPicker();
            this._createGradientColorOpacity();

            resolve();
        });
    }
}
