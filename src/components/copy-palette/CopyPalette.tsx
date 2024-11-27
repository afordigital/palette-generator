import { Button } from "@/components/shared/ui/button";
import { tailwindGenerator } from "@lib/tailwindGenerator.ts";
import { clipboard } from "@utils/clipboard.ts";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyPaletteProps {
  colors: { color: string; text: string }[];
}

export function CopyPalette({ colors }: CopyPaletteProps) {
  return (
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
  );
}
