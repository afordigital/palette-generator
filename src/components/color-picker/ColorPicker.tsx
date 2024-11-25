import { rgbaToHex } from "@/utils/rgbaToHex";
import { debounce } from "@/utils/debounce";
import { Button } from "../ui/button";
import { ArrowUpDown, Circle, Square } from "lucide-react";
import { IRgba } from "./interfaces";
import { useEffect, useRef, useState } from "react";
import { ColorPickerFactory } from "./factory";

import ColorPickerServices from "./color-picker.service";

export type ColorPickerShape = "CIRCLE" | "SQUARE";

interface IColorPickerProps {
    theme?: "light" | "dark";
}

function ColorPicker({theme = "dark"}: IColorPickerProps) {
    const canvasRef1 = useRef<HTMLCanvasElement>(null);

    const [ rgba, setRgba ] = useState<string>("255, 255, 255, 1");
    const [ isActivateMouseDown, setIsActivateMouseDown ] = useState<boolean>(false);
    const [ hexadecimal, setHexadecimal ] = useState<string>("#4323");
    const [ colorPickerType, setColorPickerType ] = useState<ColorPickerShape>("SQUARE");
    const [ colorFormat, setColorFormat ] = useState<boolean>(false);

    const handlerServices: ColorPickerServices = ColorPickerServices.getInstance();
    const colorPickerFactory: ColorPickerFactory = new ColorPickerFactory(handlerServices, canvasRef1);
    const instanceColorPicker = colorPickerFactory.create(colorPickerType);

    useEffect(() => {
        instanceColorPicker
        .paint()
        .catch((error) => console.error(error));
    },[ instanceColorPicker ]);

    const handlerOnMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        debounce({
            callback() {
                if (!isActivateMouseDown) return;

                const rgbaData: IRgba | undefined = instanceColorPicker.onMouseMove(event);
        
                if (!rgbaData) return;
        
                const rgbaText: string = `${rgbaData.red}, ${rgbaData.green}, ${rgbaData.blue}, ${rgbaData.opacity}`;
                const hexText:string = rgbaToHex([ rgbaData.red!,rgbaData.green!,rgbaData.blue!,rgbaData.opacity! ]);   
                
                if (colorFormat) setRgba(rgbaText);
                if (!colorFormat) setHexadecimal(hexText);
            },
        });
    };  

    const handlerOnMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        setIsActivateMouseDown(true);

        const rgbaData: IRgba | undefined = instanceColorPicker.onMouseDown(event);

        if (!rgbaData) return;

        const rgbaText: string = `${rgbaData.red}, ${rgbaData.green}, ${rgbaData.blue}, ${rgbaData.opacity}`;
        const hexText:string = rgbaToHex([ rgbaData.red!,rgbaData.green!,rgbaData.blue!,rgbaData.opacity! ]);
        
        if (colorFormat) setRgba(rgbaText);
        if (!colorFormat) setHexadecimal(hexText);
    };  

    return (
        <div className={theme === "dark" ? "bg-[#18181b] flex flex-col p-2 rounded-sm" : "flex flex-col p-2 rounded-sm" }>
            <div className={
                theme === "dark" ? 
                "bg-[#18181b] flex justify-evenly gap-2" : 
                "flex justify-evenly gap-2" 
            }>
                <Button
                    variant={theme === "dark" ? "default" : "ghost"} 
                    onClick={() => setColorPickerType("SQUARE")}
                    className={
                        theme === "dark" ? 
                        "hover:bg-[#212125] border-[#ffffff27] w-full transition duration-200 border-r-1 shadow-sm shadow-[#ffffff27]" : 
                        "transition duration-200 w-full"
                    }
                >
                    <Square />
                </Button>
                <Button 
                    variant={theme === "dark" ? "default" : "ghost"}
                    onClick={() => setColorPickerType("CIRCLE")}
                    className={
                        theme === "dark" 
                        ? "hover:bg-[#212125] border-[#ffffff27] w-full transition duration-200 border-l-1 shadow-sm shadow-[#ffffff27]" : 
                        "transition duration-200 w-full"
                    }
                >
                    <Circle />
                </Button>
            </div>

            <div className={theme === "dark" ? "bg-[#1e1e22] p-2" : "p-2"}>
                <canvas 
                    ref={canvasRef1} 
                    width="250" 
                    height="250" 
                    className={colorPickerType === "CIRCLE" ? "rounded-[50%]": ""}
                    onMouseDown={handlerOnMouseDown}
                    onMouseMove={handlerOnMouseMove}
                    onMouseUp={() => setIsActivateMouseDown(false)}
                >
                </canvas>
            </div>

            <div 
                className={theme === "dark" ? "bg-[#18181b] text-white " : "bg-[#f4f4f5] border-t-2 border-[#e7e7eb] " + "flex gap-2 items-center p-2"}
            >
                <Button 
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setColorFormat(!colorFormat)}
                    className={theme === "dark" ? "hover:bg-[#0e0e10]" : "hover:bg-[#ebebf0]" + "shadow-md"}
                >
                    <ArrowUpDown />
                </Button>
                {colorFormat ? `rgba(${rgba})` : `${hexadecimal}`}
            </div>
        </div>
    );
}

export default ColorPicker;