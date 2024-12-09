import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shared/ui/tooltip";
import { clipboard } from "@utils/clipboard";
import { memo, useState } from "react";
import { toast } from "sonner";

type PaletteProps = {
  colors: {
    color: string;
    text: string;
  }[];
  variant: "Primary" | "Secondary";
  position?: "start" | "center" | "end";
};

export const Palette = ({ colors }: PaletteProps) => {
  const [ lastColorCopied, setLastColorCopied ] = useState("");

  return (
    <TooltipProvider>
      <article className="grid grid-cols-[repeat(auto-fit,minmax(0px,100px))] place-content-center w-full">
        {colors.map(({ color, text }, index) => {
          return (
            <Tooltip delayDuration={200} key={color + index}>
              <div className="flex flex-col items-center gap-2 aspect-square">
                <TooltipTrigger
                  onClick={() => {
                    clipboard(color);
                    setLastColorCopied(color);
                    toast(`Color ${color} copied correctly! 🐭`);
                  }}
                  style={{ backgroundColor: color, color: text }}
                  className={`w-[100px] h-[100px] ${
                    index === 0 && "rounded-l-[8px]"
                  } ${
                    index === 8 && "rounded-r-[8px]"
                  } hover:border-2 hover:border-black`}
                ></TooltipTrigger>

                <p className="font-mono text-sm break-all text-slate-600">
                  {color}
                </p>
              </div>
              <TooltipContent>
                <p>{lastColorCopied === color ? "Copied!" : "Copy"}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </article>
    </TooltipProvider>
  );
};

export default memo(Palette);
