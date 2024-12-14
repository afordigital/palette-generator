import { Button } from "@/components/shared/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shared/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider
} from "../shared/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

interface DeletePaletteProps {
  name: string;
  action: (name: string) => void;
}

export function DeletePalette({ name, action }: DeletePaletteProps) {
  const [ showAlertDialog, setShowAlertDialog ] = useState(false);

  const deletePalette = () => {
    action(name);
    toast(`Palette deleted correctly! 🐭`);
  };

  return (
    <>
      <AlertDialog open={showAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              palette.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              aria-label="cancel delete"
              className="rounded-[4px]"
              onClick={() => {
                setShowAlertDialog(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              aria-label="confirm delete"
              variant="destructive"
              className="rounded-[4px]"
              onClick={deletePalette}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TooltipProvider>
        <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                aria-label="delete palette"
                variant="outline"
                size={"sm"}
                onClick={() => {
                  setShowAlertDialog(true);
                }}
                className="ml-2 rounded-[4px] text-red-500"
              >
                <Trash2Icon />
              </Button>
            </TooltipTrigger>
          <TooltipContent className="rounded-[4px] ">
            <p className="text-[12px]">Delete palette</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
