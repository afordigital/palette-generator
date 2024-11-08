import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {clipboard} from "@/utils/clipboard";
import {useState} from "react";
import {toast} from "sonner";

type PaletteProps = {
  colors: {
    color: string;
    text: string;
  }[];
};

export const Palette = ({colors}: PaletteProps) => {
  const [lastColorCopied, setLastColorCopied] = useState("");

  return (
    <TooltipProvider>
      <article className="flex items-center shadow-sm">
        {colors.map(({color, text}, index) => {
          return (
            <Tooltip delayDuration={200} key={color + index}>
              <TooltipTrigger
                onClick={() => {
                  clipboard(color);
                  setLastColorCopied(color);
                  toast(`Color ${color} copied correctly! 🐭`);
                }}
                style={{backgroundColor: color, color: text}}
                className="w-[100px] h-[100px] hover:border-2 hover:border-black"
              >
                {color}
              </TooltipTrigger>
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
