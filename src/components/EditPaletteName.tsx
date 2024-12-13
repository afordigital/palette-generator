import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const EditPaletteName = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {}}
            className="ml-2 rounded-[4px]"
          >
            <Edit></Edit>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="rounded-[4px] ">
          <p className="text-[12px]">Edit name</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
