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
  variant: "Primary" | "Secondary";
  position?: "start" | "center" | "end";
};

export const Palette = ({
  colors,
  variant,
  position = "center",
}: PaletteProps) => {
  const [lastColorCopied, setLastColorCopied] = useState("");

  let contentPosition;
  switch (position) {
    case "start":
      contentPosition = "place-content-start";
      break;
    case "end":
      contentPosition = "place-content-end";
      break;
    case "center":
    default:
      contentPosition = "place-content-center";
      break;
  }

  return (
    <TooltipProvider>
      <article
        className={`grid ${
          variant === "Primary"
            ? "grid-cols-[repeat(auto-fit,minmax(0px,100px))]"
            : "grid-cols-[repeat(auto-fit,minmax(0px,30px))]"
        } ${contentPosition} w-full`}
      >
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
                      : "w-[32px] h-[32px]"
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

export default memo(Palette);
