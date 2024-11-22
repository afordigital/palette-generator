import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  trackColor?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, trackColor, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    style={{ "--color": trackColor }}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-900/20 dark:bg-zinc-50/20">
      <SliderPrimitive.Range className="absolute h-full bg-[var(--color)] dark:bg-zinc-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block w-4 h-4 transition-colors bg-white border rounded-full shadow border-zinc-200 border-zinc-900/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:border-zinc-50/50 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
