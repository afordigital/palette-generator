import { Button } from "@components/shared/ui/button.tsx";
import { toast } from "sonner";
import { tailwindGenerator } from "@lib/tailwindGenerator.ts";
import store from "@utils/palettes.ts";

interface SavePaletteProps {
  colors: { color: string; text: string }[];
}

export function SavePalette({ colors }: SavePaletteProps) {
  return (
    <Button
      onClick={() => {
        tailwindGenerator(colors).then(([ name, palette ]) => {
          store.add(name, palette);
          toast(`Palette saved correctly! 🐭`);
        });
      }}
      className="ml-4 rounded-[4px]"
    >
      Save Palette
    </Button>
  );
}
