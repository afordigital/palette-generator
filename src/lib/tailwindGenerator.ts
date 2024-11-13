import type { Palette } from "@/utils/palettes.ts";

const useOpen = true;
const COLOR_API_URL = useOpen
  ? "https://api.color.pizza/v1/"
  : "http://localhost:3001/";

export async function tailwindGenerator(
  colors: { color: string; text: string }[]
) {
  const { name, paletteTitle } = await fetch(
    `${COLOR_API_URL}${colors[4].color.slice(1)}`
  ).then((res) => res.json());
  const normalizedName = (name?.value || paletteTitle)
    .toLowerCase()
    .replaceAll(" ", "-");
  return [
    normalizedName,
    colors.reduce((acc: Palette, { color }, index) => {
      acc[(index + 1) * 100] = color;
      return acc;
    }, {}),
  ];
}
