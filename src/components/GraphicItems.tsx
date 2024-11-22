import { CardComponent } from "./items/Card";
import { ChartComponent } from "./items/ChartComponent";
import { CheckboxComponent } from "./items/Checkbox";
import { memo } from "react";
import { SliderComponent } from "./items/SliderComponent";
import { AlertComponent } from "./items/AlertComponent";

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
