import { Edit } from "lucide-react";
import { Button } from "../shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  // TooltipTrigger,
} from "../shared/ui/tooltip";

export const EditPaletteName = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
          <Button
            aria-label="edit button"
            size={"sm"}
            variant={"outline"}
            onClick={() => {}}
            className="ml-2 rounded-[4px]"
          >
            <Edit  />
          </Button>
        <TooltipContent className="rounded-[4px] ">
          <p className="text-[12px]">Edit name</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
