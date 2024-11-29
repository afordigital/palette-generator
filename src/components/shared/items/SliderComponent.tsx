import { Slider } from "../ui/slider";

export const SliderComponent = ({ color }: { color: string }) => {
  return (
    <Slider
      defaultValue={[ 50 ]}
      style={{ "--color": color }}
      trackColor={color}
    />
  );
};
