import { CardComponent } from "./Card";
import { ChartComponent } from "./ChartComponent";
import { CheckboxComponent } from "./Checkbox";

export type GraphicItemsProps = {
  color: string;
};

export const GraphicItems = ({ color }: GraphicItemsProps) => {
  return (
    <div className="flex  gap-[32px]">
      <CardComponent></CardComponent>
      <CheckboxComponent color={color}></CheckboxComponent>
      <ChartComponent color={color}></ChartComponent>
    </div>
  );
};
