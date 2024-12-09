import { HexadecimalContext } from "@/provider/hexadecimal/hexadecimal.context";
import { useContext } from "react";

function ColorPicker() {
    const provider = useContext(HexadecimalContext);

    return (
        <div className="flex flex-col items-center gap-2 md:flex-row">
            <label htmlFor="current-colors" className="relative">
                <input
                    aria-label="select a color"
                    className="absolute left-2 top-[6px]"
                    onChange={(value) => provider.setHexColor(value.target.value, true)}
                    type="color"
                    value={provider.hexColor}
                >
                </input>
                <input
                    aria-label="type a color or observe the color selected"
                    className="py-[6px] pl-16 font-mono border-[1px] border-slate-700 rounded-[4px]"
                    onChange={(event) => provider.setHexColor(event.target.value)}
                    placeholder="#FDA12D"
                    type="text"
                    value={provider.hexColor}
                />
            </label>
        </div>
    );
}

export default ColorPicker;
