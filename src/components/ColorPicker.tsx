import { HexadecimalContext } from "@/provider/hexadecimal/hexadecimal.context";
import { useContext } from "react";

function ColorPicker() {
    const provider = useContext(HexadecimalContext);

    return (
        <div className="flex flex-col items-center gap-2 md:flex-row">
            <label htmlFor="current-colors" className="relative">
                <input
                    value={provider.hexColor}
                    type="color"
                    onChange={(value) => provider.setHexColor(value.target.value)}
                    className="absolute left-2 top-[6px]"
                >
                </input>
                <input
                    value={provider.hexColor}
                    onChange={(event) => provider.setHexColor(event.target.value)}
                    placeholder="#FDA12D"
                    className="py-[6px] pl-16 font-mono border-[1px] border-slate-700 rounded-[4px]"
                />
            </label>
        </div>
    );
}

export default ColorPicker;
