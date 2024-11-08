import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";

interface DeletePaletteProps {
  name: string;
  action: (name: string) => void;
}

export function DeletePalette({name, action}: DeletePaletteProps) {
  return <Button
    onClick={() => {
      action(name);
      toast(`Palette deleted correctly! 🐭`);
    }}
    className="ml-4 rounded-[4px]">Delete Palette</Button>;
}
