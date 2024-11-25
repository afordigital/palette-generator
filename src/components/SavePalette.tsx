import { Button } from "@components/ui/button.tsx";
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
          action(name, palette);
          toast(`Palette saved correctly! 🐭`);
        });
      }}
      className="ml-4 rounded-[4px]"
    >
      Save Palette
      <Save />
    </Button>
  );
}
