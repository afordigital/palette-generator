import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shared/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { type ChartConfig } from "@/components/shared/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

type ChartComponentProps = {
  color: string;
};

export const ChartComponent = ({ color }: ChartComponentProps) => {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: color,
    },
    mobile: {
      label: "Mobile",
      color: color,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      className="max-w-[calc(100vw-2rem)] lg:max-w-[25vw] h-[500px]"
      config={chartConfig}
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
