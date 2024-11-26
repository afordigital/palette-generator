import { HexadecimalContext } from "@/provider/hexadecimal/hexadecimal.context";
import { debounce } from "@/utils/debounce";
import { ValidateHexadecimal } from "@/utils/hexadecimal-validator";
import { useContext, useDeferredValue } from "react";

class ColorPickerController {
    public onChange(color:string, callback:(color:string) => void) {
        if (!ValidateHexadecimal(color)) return;

        debounce({
          callback: () => callback(color),
        });
    }
}

const controller: ColorPickerController = new ColorPickerController();

function ColorPicker() {
    
    const provider = useContext(HexadecimalContext);
    const deferredColor = useDeferredValue(provider.hexColor);


    return (
        <div className="flex flex-col items-center gap-2 md:flex-row">
        <label htmlFor="current-colors" className="relative">
            <input
            type="color"
            value={deferredColor}
            onChange={(event) => ValidateHexadecimal(event.target.value) && provider}
            className="absolute left-2 top-[6px]"
            ></input>
            <input
            id="current-color"
            value={provider.hexColor}
            onChange={(event) => controller.onChange(event.target.value, provider.setHexColor)}
            placeholder="#FDA12D"
            className="py-[6px] pl-16 font-mono border-[1px] border-slate-700 rounded-[4px]"
            />
        </label>
        </div>
    );
}

export default ColorPicker;
