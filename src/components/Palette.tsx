import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clipboard } from "@/utils/clipboard";
import { useState } from "react";
import { toast } from "sonner";

type PaletteProps = {
  colors: {
    color: string;
    text: string;
  }[];
  variant: "Primary" | "Secondary";
};

export const Palette = ({ colors, variant }: PaletteProps) => {
  const [lastColorCopied, setLastColorCopied] = useState("");

  return (
    <TooltipProvider>
      <article className="flex items-center">
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
                  className={` ${
                    variant === "Primary"
                      ? "w-[100px] h-[100px]"
                      : "w-[30px] h-[30px]"
                  } hover:border-2 hover:border-black`}
                ></TooltipTrigger>
                {variant === "Primary" && (
                  <p className="text-sm text-slate-600">{color}</p>
                )}
              </div>
              <TooltipContent>
                {variant === "Primary" ? (
                  <p>{lastColorCopied === color ? "Copied!" : "Copy"}</p>
                ) : (
                  <p>{color}</p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </article>
    </TooltipProvider>
  );
};
