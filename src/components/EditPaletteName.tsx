import { Edit } from "lucide-react";
import { Button } from "./ui/button";

type Props = {};

export const EditPaletteName = (props: Props) => {
  return (
    <Button
      size={"sm"}
      variant={"outline"}
      onClick={() => {}}
      className="ml-2 rounded-[4px]"
    >
      <Edit></Edit>
    </Button>
  );
};
