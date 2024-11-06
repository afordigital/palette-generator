import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clipboard } from "@/utils/clipboard";
import { useState } from "react";

type PaletteProps = {
  lightScale: string[];
  color: string;
  darkScale: string[];
};

export const Palette = ({ lightScale, color, darkScale }: PaletteProps) => {
  const [lastColorCopied, setLastColorCopied] = useState("");

  return (
    <TooltipProvider>
      <article className="flex shadow-sm">
        {lightScale.map((color) => {
          return (
            <Tooltip delayDuration={200} key={color}>
              <TooltipTrigger
                onClick={() => {
                  clipboard(color);
                  setLastColorCopied(color);
                }}
                style={{ backgroundColor: color }}
                className="w-[100px] h-[100px] hover:border-2 hover:border-black"
              ></TooltipTrigger>
              <TooltipContent>
                <p>{lastColorCopied === color ? "Copied!" : "Copy"}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Tooltip delayDuration={200}>
          <TooltipTrigger
            onClick={() => {
              clipboard(color);
              setLastColorCopied(color);
            }}
            style={{ backgroundColor: color }}
            className="w-[100px] h-[100px] hover:border-2 hover:border-black"
          ></TooltipTrigger>
          <TooltipContent>
            <p>{lastColorCopied === color ? "Copied!" : "Copy"}</p>
          </TooltipContent>
        </Tooltip>
        {darkScale.map((color) => {
          return (
            <Tooltip delayDuration={200} key={color}>
              <TooltipTrigger
                onClick={() => {
                  clipboard(color);
                  setLastColorCopied(color);
                }}
                style={{ backgroundColor: color }}
                className="w-[100px] h-[100px] hover:border-2 hover:border-black"
              ></TooltipTrigger>
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
