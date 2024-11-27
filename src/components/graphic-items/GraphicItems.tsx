import { CardComponent } from "../shared/items/Card";
import { ChartComponent } from "../shared/items/ChartComponent";
import { CheckboxComponent } from "../shared/items/Checkbox";
import { memo } from "react";
import { SliderComponent } from "../shared/items/SliderComponent";
import { AlertComponent } from "../shared/items/AlertComponent";

export type GraphicItemsProps = {
  color: string;
};

const GraphicItems = ({ color }: GraphicItemsProps) => {
  return (
    <div className="flex flex-col pt-10 lg:flex-row gap-[32px]">
      <CardComponent color={color}></CardComponent>
      <div className="flex flex-col gap-8 min-w-[300px]">
        <CheckboxComponent color={color}></CheckboxComponent>
        <SliderComponent color={color}></SliderComponent>
        <AlertComponent></AlertComponent>
      </div>
      <ChartComponent color={color}></ChartComponent>
    </div>
  );
};

export default memo(GraphicItems);
