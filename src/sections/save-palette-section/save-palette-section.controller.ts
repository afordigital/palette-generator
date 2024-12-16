import { Palette } from "@/utils/palettes";
import chroma from "chroma-js";

export interface IPalettes {
    color: string;
    text: string;
}

export class SavePaletteSectionController {
    public copyPaletteColors(palette: Palette): IPalettes[] {
        return Object.entries(palette).map(
            ([ , color ]) => ({
                color,
                text:
                chroma.contrast(color, "#191919") > 4.5
                    ? "#191919"
                    : "#FEFDFC",
            })
        );
    }

    public littlePaletteColors(palette: Palette): IPalettes[] {
        return Object.entries(palette).map(([ , color ]) => ({
            color,
            text:
            chroma.contrast(color, "#191919") > 4.5
                ? "#191919"
                : "#FEFDFC",
        }));
    }
}