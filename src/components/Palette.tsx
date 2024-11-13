import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clipboard } from "@/utils/clipboard";
import { memo, useState } from "react";
import { toast } from "sonner";

type PaletteProps = {
  colors: {
    color: string;
    text: string;
  }[];
  savePalette?: (newPalette: string) => void;
};

const Palette = ({ colors }: PaletteProps) => {
  const [lastColorCopied, setLastColorCopied] = useState("");

  return (
    <article className="flex justify-center items-center w-full">
      <TooltipProvider>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(0,100px))] place-content-center w-full">
          {colors.map(({ color, text }, index) => {
            return (
              <Tooltip delayDuration={200} key={color + index}>
                <TooltipTrigger
                  onClick={() => {
                    clipboard(color);
                    setLastColorCopied(color);
                    toast(`Color ${color} copied correctly! 🐭`);
                  }}
                  style={{ backgroundColor: color, color: text }}
                  className="w-[100px] h-[100px] hover:border-2 hover:border-black shadow"
                >
                  {color}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{lastColorCopied === color ? "Copied!" : "Copy"}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </article>
  );
};

export default memo(Palette);
