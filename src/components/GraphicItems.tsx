import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

export type GraphicItemsProps = {
  color: string;
};

export const GraphicItems = ({ color }: GraphicItemsProps) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex items-center gap-2">
        <Checkbox id="email2" className="rounded-[4px] checked:bgs-red-500" />
        <Label htmlFor="email2">Your email address</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="email"
          style={{"--color": color}}
          className="rounded-[4px] data-[state=checked]:bg-[var(--color)] data-[state=checked]:border-red-500"
        />
        <Label htmlFor="email">Your email address</Label>
      </div>
    </div>
  );
};
