import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Palette } from "./Palette";

describe("./src/components/palette/Palette.tsx", () => {

  const colors = [
    { color: "#FF0000", text: "#FFFFFF" },
    { color: "#00FF00", text: "#000000" },
    { color: "#0000FF", text: "#FFFFFF" },
    { color: "#FFFF00", text: "#000000" },
    { color: "#FF00FF", text: "#000001" },
    { color: "#00FFFF", text: "#000002" },
  ];

  test("should render all colors as buttons", () => {
    render(<Palette colors={colors} variant="Primary" position="center"/>);

    colors.forEach(({ color }) => {
      const colorBox = screen.getByText(color);
      expect(colorBox).toBeInTheDocument();
    });
  });
});
