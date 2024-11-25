import { Button } from "@components/ui/button.tsx";
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
} from "@components/ui/alert-dialog";

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
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-[4px]"
              onClick={() => {
                setShowAlertDialog(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              className="rounded-[4px]"
              onClick={deletePalette}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        variant="outline"
        size={"sm"}
        onClick={() => {
          setShowAlertDialog(true);
        }}
        className="ml-2 rounded-[4px] text-red-500"
      >
        <Trash2Icon></Trash2Icon>
      </Button>
    </>
  );
}
