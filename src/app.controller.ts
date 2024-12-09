import chroma from "chroma-js";
import { ValidateHexadecimal } from "./utils/hexadecimal-validator";
import { getRandomColor } from "./utils/getRandomColor";

class AppController {
    public getColor(deferredColor: string){
      const scaleColors: string[] = [ "#FFFFFF", deferredColor, "#000000" ];
  
      return chroma
      .scale(scaleColors)
      .colors(11)
      .slice(1, 10)
      .map((color) => ({
        color,
        text: chroma.contrast(color, "#191919") > 4.5 ? "#191919" : "#FEFDFC",
      }));
    }
  
    public getRandom(): string | undefined {
      const hexadecimalRandom: string = getRandomColor();
  
      if (!ValidateHexadecimal(hexadecimalRandom)) return;
  
      return hexadecimalRandom;
    }
}

export default AppController;