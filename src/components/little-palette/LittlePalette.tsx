import { clipboard } from "@/utils/clipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { memo } from "react";
import { toast } from "sonner";

type PaletteProps = {
  colors: {
    color: string;
    text: string;
  }[];
};

export const LittlePalette = ({ colors }: PaletteProps) => {
  return (
    <TooltipProvider>
      <article aria-label="little-palette" className="flex flex-row">
        {colors.map(({ color, text }, index) => {
          return (
            <Tooltip delayDuration={200} key={color + index}>
              <div className="flex flex-row items-center gap-2 aspect-square">
                <TooltipTrigger
                  onClick={() => {
                    clipboard(color);
                    toast(`Color ${color} copied correctly! 🐭`);
                  }}
                  style={{ backgroundColor: color, color: text }}
                  className={`w-[40px] h-[40px] hover:border-2 hover:border-black ${
                    index === 0 && "rounded-l-[6px]"
                  } ${index === 8 && "rounded-r-[6px]"}`}
                ></TooltipTrigger>
              </div>
              <TooltipContent>
                <p className="px-2 py-1 text-[12px] text-white rounded-[4px] bg-slate-800">
                  {color}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </article>
    </TooltipProvider>
  );
};

export default memo(LittlePalette);
