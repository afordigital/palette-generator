import "./color-picker.css";

import { Input } from "@/components/shared/ui/input"
import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { HexadecimalContext } from "@/provider/hexadecimal/hexadecimal.context";
import { Shuffle, ArrowUpDown } from "lucide-react";
import { Button } from "../shared/ui/button";
import { getRandomColor } from "@/utils/getRandomColor";
import { ValidateHexadecimal } from "@/utils/hexadecimal-validator";
import { debounce } from "@/utils/debounce";
import { hexToRgb } from "@/utils/hexToRgb";
import { hexToHSL } from "@/utils/hexToHsl";
import { hexToHWB } from "@/utils/hexToHwb";

class ColorPickerHandles {
    private colorTypes: string[] = [];
    private clicks: number = 0; 

    public generateRandomColor(callback: (hex:string) => void){
        const newColor:string = getRandomColor();

        if (ValidateHexadecimal(newColor)) debounce({callback: ()=> callback(newColor)}); 
    }

    public getColorTypes(color:string): string{
        this.clicks++;

        this.colorTypes = [color ,hexToRgb(color), hexToHSL(color), hexToHWB(color)];

        if (this.clicks === this.colorTypes.length) this.clicks = 0;

        return this.colorTypes[this.clicks];
    }
}

const colorPickerHandles: ColorPickerHandles = new ColorPickerHandles();

export default function ColorPicker() {
    const provider = useContext(HexadecimalContext);
    const [color, setColor] = useState<string>(provider.hexColor);

    return (
        <>
            <HexColorPicker color={provider.hexColor} onChange={provider.setHexColor}/>
            <div className="flex">
                <Button
                    onClick={() => colorPickerHandles.generateRandomColor(provider.setHexColor)}
                    variant={"secondary"}
                >
                    Generate Random
                    <Shuffle />
                </Button>
                <Input
                    type="text" 
                    onChange={(value) => provider.setHexColor(value.target.value)} 
                    value={!color ? provider.hexColor : color}
                    className="w-32 outline-none focus:border-none bg-[#18181b] text-[#eee]"
                />
                <Button 
                    variant={"secondary"}
                    onClick={() => setColor(colorPickerHandles.getColorTypes(provider.hexColor))}
                >
                    <ArrowUpDown />
                </Button>
            </div>
        </>
    );
}
