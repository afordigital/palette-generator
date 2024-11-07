import { useEffect, useState } from "react";
import "./App.css";
import chroma from "chroma-js";
import { Palette } from "./components/Palette";
import { GraphicItems } from "./components/GraphicItems";
import { useLocation } from "wouter";
import { Button } from "./components/ui/button";
import { getRandomColor } from "./utils/getRandomColor";
import { Toaster } from "@/components/ui/sonner";
import { LastPalettes } from "./components/LastPalettes";

function App() {
  const [color, setColor] = useState("#34d0ef");
  const [colorAux, setColorAux] = useState(color);

  const [lastPalettes, setLastPalettes] = useState<string[]>([]);

  const [, setLocation] = useLocation();

  const colors = chroma
    .scale(["#FFFFFF", color, "#000000"])
    .colors(11)
    .slice(1, 10)
    .map((color) => {
      return {
        color,
        text: chroma.contrast(color, "#191919") > 4.5 ? "#191919" : "#FEFDFC",
      };
    });

  const isValid = (newColor: string) => {
    const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    if (regex.test(newColor)) {
      setColor(newColor);
      setLocation("?color=%23" + newColor.slice(1, 8));
      return true;
    }
    return false;
  };

  const savePalette = (newPalette: string) => {
    setLastPalettes((lastPalettes) => [...lastPalettes, newPalette]);
  };

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search).get(
      "color"
    );
    if (!queryString) {
      const newColor = getRandomColor();
      setColor(newColor);
      setColorAux(newColor);
    } else {
      setColor(queryString!);
      setColorAux(queryString!);
    }
  }, []);

  return (
    <section
      style={{ "--color": color + "64" }}
      className="bg-gradient-to-b from-[var(--color)] to-white to-40% flex flex-col gap-[48px] items-center justify-center w-full h-screen"
    >
      <h1 className="text-6xl font-bold">
        Generate your{" "}
        <span className="inline-block rotate-3 hover:rotate-2 bg-[var(--color)] p-1 border-black border-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-[4px]">
          Palette
        </span>
      </h1>
      <Toaster />
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            const newColor = getRandomColor();
            setColor(newColor);
            setColorAux(newColor);
            setLocation("?color=%23" + newColor.slice(1, 8));
          }}
          variant={"secondary"}
          className="rounded-[4px]"
        >
          Generate Random
        </Button>
        <label htmlFor="current-colors" className="relative">
          <input
            type="color"
            value={color}
            onChange={(event) => {
              setLocation("?color=%23" + event.target.value.slice(1, 8));
              setColor(event.target.value);
              setColorAux(event.target.value);
            }}
            className="absolute left-2 top-[6px]"
          ></input>
          <input
            id="current-color"
            value={colorAux}
            onChange={(event) => {
              setColorAux(event.target.value);
              isValid(event.target.value);
            }}
            placeholder="#FDA12D"
            className="py-[6px] pl-16 pr-16 border-[1px] border-slate-700 rounded-[4px]"
          />
        </label>
      </div>

      <LastPalettes lastPalettes={lastPalettes} />
      <Palette colors={colors} savePalette={savePalette} />
      <GraphicItems color={color} />
    </section>
  );
}

export default App;
