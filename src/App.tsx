import {useEffect, useState, useSyncExternalStore} from "react";
import "./App.css";
import chroma from "chroma-js";
import {Palette} from "@/components/Palette";
import {GraphicItems} from "@/components/GraphicItems";
import {useLocation} from "wouter";
import {Button} from "@/components/ui/button";
import {getRandomColor} from "@/utils/getRandomColor";
import {Toaster} from "@/components/ui/sonner";
import {SavedPalettes} from "@/components/SavedPalettes.tsx";
import {SavePalette} from "@/components/SavePalette.tsx";
import store, {type Palettes} from '@/utils/palettes';
import {DeletePalette} from "@/components/DeletePalette.tsx";
import {CopyPalette} from "@/components/CopyPalette.tsx";

function App() {
  const [color, setColor] = useState("#34d0ef");
  const [colorAux, setColorAux] = useState(color);
  const savedPalettes = useSyncExternalStore<Palettes>(store.subscribe, store.getSnapshot);

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
    <>
      <section
        style={{"--color": color + "64"}}
        className="bg-gradient-to-b from-[var(--color)] to-white to-40% flex flex-col gap-[48px] items-center justify-center w-full min-h-screen max-h-full p-48"
      >
        <h1 className="text-6xl font-bold">
          Generate your{" "}
          <span
            className="inline-block rotate-3 hover:rotate-2 bg-[var(--color)] p-1 border-black border-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-[4px]">
          Palette
        </span>
        </h1>
        <Toaster/>
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
        <SavedPalettes savedPalettes={savedPalettes}/>
        <Palette colors={colors}/>
        <SavePalette colors={colors} action={store.add}></SavePalette>

        <GraphicItems color={color}/>
      </section>

      <section className="flex gap-[48px] p-12 min-h-screen">
        {savedPalettes && Object.keys(savedPalettes).length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold">Saved Palettes</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              {Object.entries(savedPalettes).map(([name, palette]) => {
                return <div key={name} className="flex flex-col gap-[24px]">
                  <div className="flex flex-row">
                    <h4 className="text-2xl font-bold">{name.replaceAll('-', ' ')}</h4>
                    <DeletePalette name={name} action={store.rem}></DeletePalette>
                    <CopyPalette colors={Object.entries(palette).map(([, color]) => ({
                      color,
                      text: chroma.contrast(color, "#191919") > 4.5 ? "#191919" : "#FEFDFC"
                    }))}></CopyPalette>
                  </div>
                  <Palette colors={Object.entries(palette).map(([, color]) => ({
                    color,
                    text: chroma.contrast(color, "#191919") > 4.5 ? "#191919" : "#FEFDFC"
                  }))}/>
                </div>;
              })}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
