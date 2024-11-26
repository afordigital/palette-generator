import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type CheckboxProps = {
  color: string;
};

export const CheckboxComponent = ({ color }: CheckboxProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox
          id="email2"
          style={{ "--color": color }}
          className="rounded-[4px] data-[state=checked]:bg-[var(--color)] data-[state=checked]:border-[var(--color)] "
        />
        <Label htmlFor="email2">Your email address</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="checkbox2"
          defaultChecked
          style={{ "--color": color }}
          className="rounded-[4px] data-[state=checked]:bg-[var(--color)] data-[state=checked]:border-[var(--color)] "
        />
        <Label htmlFor="checkbox2">Your email address</Label>
      </div>
    </>
  );
};
