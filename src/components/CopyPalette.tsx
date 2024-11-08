import {Button} from "@/components/ui/button.tsx";
import {tailwindGenerator} from "@/lib/tailwindGenerator.ts";
import {clipboard} from "@/utils/clipboard.ts";
import {toast} from "sonner";

interface CopyPaletteProps {
  colors: { color: string, text: string }[];
}

export function CopyPalette({colors}: CopyPaletteProps) {
  return <Button
    onClick={() => {
      tailwindGenerator(colors).then(([, palette]) => {
        clipboard(JSON.stringify(palette));
        toast(`Palette copied correctly! 🐭`);
      });
    }}
    className="ml-4 rounded-[4px]">Copy Palette</Button>;
}
