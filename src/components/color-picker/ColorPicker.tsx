import "./color-picker.css";

import { Badge } from "@components/shared/ui/badge";
import { useContext } from "react";
import { HexColorPicker } from "react-colorful";
import { HexadecimalContext } from "@/provider/hexadecimal/hexadecimal.context";
import { Shuffle } from "lucide-react";
import { Button } from "../shared/ui/button";
import { getRandomColor } from "@/utils/getRandomColor";
import { ValidateHexadecimal } from "@/utils/hexadecimal-validator";
import { debounce } from "@/utils/debounce";

class ColorPickerHandles {
    public generateRandomColor(callback: (hex:string) => void){
        const newColor:string = getRandomColor();

        if (ValidateHexadecimal(newColor)) debounce({callback: ()=> callback(newColor)}); 
    }
}

const colorPickerHandles: ColorPickerHandles = new ColorPickerHandles();

export default function ColorPicker() {
    const provider = useContext(HexadecimalContext);

    return (
        <>
            <HexColorPicker color={provider.hexColor} onChange={provider.setHexColor}/>
            <div>
                <Button
                    onClick={() => colorPickerHandles.generateRandomColor(provider.setHexColor)}
                    variant={"secondary"}
                >
                    Generate Random
                    <Shuffle />
                </Button>
                <Badge className="py-[9px]">{provider.hexColor}</Badge>
            </div>
        </>
    );
}
