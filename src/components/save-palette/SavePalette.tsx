import { Button } from "@/components/shared/ui/button";
import { toast } from "sonner";
import { tailwindGenerator } from "@lib/tailwindGenerator.ts";
import type { Palette } from "@utils/palettes.ts";
import { Save } from "lucide-react";

interface SavePaletteProps {
  colors: { color: string; text: string }[];
  action: (name: string, palette: Palette) => void;
}

export function SavePalette({ colors, action }: SavePaletteProps) {
  
  return (
    <Button
      onClick={() => {
        tailwindGenerator(colors).then(([ name, palette ]) => {
          action(name.toString(), palette);
          toast(`Palette saved correctly! 🐭`);
        });
      }}
      className="ml-4 rounded-[4px]"
    >
      <Save />
      Save Palette
    </Button>
  );
}
