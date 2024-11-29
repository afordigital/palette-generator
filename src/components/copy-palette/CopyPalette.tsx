import { Button } from "@/components/shared/ui/button";
import { tailwindGenerator } from "@lib/tailwindGenerator.ts";
import { clipboard } from "@utils/clipboard.ts";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shared/ui/tooltip";

interface CopyPaletteProps {
  colors: { color: string; text: string }[];
}

export function CopyPalette({ colors }: CopyPaletteProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {
              tailwindGenerator(colors).then(([, palette]) => {
                clipboard(JSON.stringify(palette));
                toast(`Palette copied correctly! 🐭`);
              });
            }}
            className="ml-2 rounded-[4px]"
          >
            <Copy></Copy>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="rounded-[4px] ">
          <p className="text-[12px]">Copy palette</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
