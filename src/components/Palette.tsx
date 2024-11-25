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
        className={`grid gap-1 ${
          variant === "Primary"
            ? "grid-cols-[repeat(auto-fit,minmax(0px,100px))]"
            : "grid-cols-[repeat(auto-fit,minmax(0px,40px))]"
        } ${contentPosition} w-full rounded-lg bg-zinc-50/50 p-4 shadow-sm backdrop-blur-sm dark:bg-zinc-900/50`}
      >
        {colors.map(({ color, text }, index) => {
          return (
            <Tooltip delayDuration={200} key={color + index}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    clipboard(color);
                    setLastColorCopied(color);
                    toast(`Color ${color} copied correctly! 🐭`);
                  }}
                  className="group relative flex flex-col items-center gap-2"
                >
                  <div
                    style={{ backgroundColor: color, color: text }}
                    className={`${
                      variant === "Primary"
                        ? "h-[100px] w-[100px]"
                        : "h-[40px] w-[40px]"
                    } rounded-md transition-all hover:scale-110 hover:shadow-lg ${
                      variant === "Secondary"
                        ? "hover:z-10"
                        : ""
                    }`}
                  />
                  {variant === "Primary" && (
                    <span className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
                      {color}
                    </span>
                  )}
                </button>
              </TooltipTrigger>
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
