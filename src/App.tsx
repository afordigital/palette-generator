import { useEffect, useState } from "react";
import "./App.css";
import chroma from "chroma-js";
import { Palette } from "./components/Palette";
import { GraphicItems } from "./components/GraphicItems";
import { useLocation } from "wouter";
import { Button } from "./components/ui/button";

function App() {
  const [color, setColor] = useState("#34d0ef");
  const [, setLocation] = useLocation();

  const colors = chroma.scale(["#FFFFFF", color, "#000000"]).colors(11).slice(1, 10).map(color => {
    return {
      color,
      text: chroma.contrast(color, "#191919") > 4.5 ? "#191919" : "#FEFDFC",
    }
  });

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search).get(
      "color"
    );
    console.log(queryString);
    setColor(queryString ?? "#34d0ef");
  }, []);

  return (
    <section
      style={{ "--color": color + "64" }}
      className="bg-gradient-to-b from-[var(--color)] to-white to-40% flex flex-col gap-[72px] items-center justify-center w-full h-screen"
    >
      <h1 className="text-6xl font-bold">Generate your palette</h1>
      <div className="flex items-center gap-2">
        <label htmlFor="current-colors" className="relative">
          <input
            type="color"
            value={color}
            onChange={(event) => {
              setLocation("?color=%23" + event.target.value.slice(1, 8));
              setColor(event.target.value);
            }}
            className="absolute left-2 top-[6px]"
          ></input>
          <input
            id="current-color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
            placeholder="#FDA12D"
            className="py-[6px] pl-16 pr-16 border-[1px] border-slate-700 rounded-[4px]"
          />
        </label>
        <Button className="rounded-[4px]">Save</Button>
      </div>
      <Palette colors={colors} />
      <GraphicItems color={color} />
    </section>
  );
}

export default App;
