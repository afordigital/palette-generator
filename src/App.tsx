import { useState } from "react";
import "./App.css";
import chroma from "chroma-js";
import { Palette } from "./components/Palette";
import { GraphicItems } from "./components/GraphicItems";

function App() {
  const [color, setColor] = useState("#34d0ef");

  const lightScale = chroma.scale(["#FEFDFC", color]).colors(6).slice(0, 5);
  const darkScale = chroma.scale([color, "#191919"]).colors(5).slice(1, 5);

  console.log(lightScale);
  console.log(darkScale);

  return (
    <section className="flex flex-col gap-[72px] items-center justify-center w-full h-screen">
      <div className="flex items-center">
        <label htmlFor="current-colors" className="relative">
          <input
            type="color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
            className="absolute left-2 top-2"
          ></input>
          <input
            id="current-color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
            placeholder="#FDA12D"
            className="py-2 pl-16 pr-16 border-2 border-black rounded-[4px]"
          />
        </label>
      </div>
      <Palette lightScale={lightScale} color={color} darkScale={darkScale} />
      <GraphicItems color={color} />
    </section>
  );
}

export default App;
