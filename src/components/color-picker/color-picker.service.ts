import CanvasError from "@/errors/canvas.error";
import EventErrors from "@/errors/events.errors";
import { RefObject } from "react";
import { IRgba } from "./interfaces";

interface IColorPickerService {
    onLoadImage(context: CanvasRenderingContext2D, image: HTMLImageElement): void;
    updateColorColorPicker(event: React.MouseEvent<HTMLCanvasElement>, context: CanvasRenderingContext2D, canvas: RefObject<HTMLCanvasElement>): IRgba;
}

class ColorPickerServices implements IColorPickerService {
    private static _instance: ColorPickerServices | null = null;

    private constructor() {}

    public static getInstance(): ColorPickerServices {
        if (!this._instance) {
            this._instance = new ColorPickerServices();
        }

        return this._instance;
    }

    public onLoadImage(context: CanvasRenderingContext2D, image: HTMLImageElement): void {
        if (!context) throw CanvasError.context("Context is undefined", "HandlersServices.onLoadImage()");

        context.drawImage(image, 0, 0, image.width, image.height);
    }

    public updateColorColorPicker(event: React.MouseEvent<HTMLCanvasElement>, context: CanvasRenderingContext2D, canvas: RefObject<HTMLCanvasElement>): IRgba {
        if (!event) throw EventErrors.mouseDown("Event is undefined", "HandlersServices.updateColorSquareColorPicker()");
        if (!context) throw CanvasError.context("Context is undefined", "HandlersServices.updateColorSquareColorPicker()");
        if (!canvas.current) throw CanvasError.instance("Canvas is undefined", "HandlersServices.updateColorSquareColorPicker()");

        const imgData = context.getImageData(
            (event.nativeEvent.offsetX / canvas.current.clientWidth) * canvas.current.width, 
            (event.nativeEvent.offsetY / canvas.current.clientHeight) * canvas.current.height, 
            1, 1
        );
        
        return {
            red: imgData.data[0],
            green: imgData.data[1],
            blue: imgData.data[2],
            opacity: imgData.data[3] / 255,
        };
    }
}

export default ColorPickerServices;
