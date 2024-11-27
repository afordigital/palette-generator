import "./App.css";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Button } from "@components/ui/button";
import { getRandomColor } from "@utils/getRandomColor";
import { SavePalette } from "@components/SavePalette.tsx";
import { Shuffle } from "lucide-react";
import { Toaster } from "@components/ui/sonner";
import { useLocation } from "wouter";
import { ValidateHexadecimal } from "./utils/hexadecimal-validator";
import { HexadecimalContext } from "./provider/hexadecimal/hexadecimal.context";

import chroma from "chroma-js";
import GraphicItems from "@components/GraphicItems";
import Layout from "./layouts/Layout";
import Palette from "@components/Palette";
import store from "@utils/palettes";
import ColorPicker from "./components/ColorPicker";
import SavePaletteSection from "./sections/save-palette-section/SavePaletteSection";

class AppController {
  public getColor(deferredColor:string){
    const scaleColors: string[] = [ "#FFFFFF", deferredColor, "#000000" ];

    return chroma
    .scale(scaleColors)
    .colors(11)
    .slice(1, 10)
    .map((color) => ({
      color,
      text: chroma.contrast(color, "#191919") > 4.5 ? "#191919" : "#FEFDFC",
    }));
  }

  public getRandom(): string | undefined {
    const hexadecimalRandom: string = getRandomColor();

    if (!ValidateHexadecimal(hexadecimalRandom)) return;

    return hexadecimalRandom;
  }
}

const controller: AppController = new AppController();

function App() {
  const provider = useContext(HexadecimalContext);

  const [, setLocation] = useLocation();

  const [color, setColor] = useState("#ffffff");

  const colors = useMemo(() => controller.getColor(color), [ color ]);

  useEffect(() => {
    if (!ValidateHexadecimal(provider.hexColor)) return;

    // update all the component
    setColor(provider.hexColor);

    setLocation("?color=%23" + provider.hexColor.slice(1, 8));
  }, [ provider.hexColor, setLocation ]);

  return (
    <Layout>
      <section className="pt-24 font-sans">
        <div
          style={{ "--color": color + "64" }}
          className="absolute inset-0 bg-gradient-to-b from-[var(--color)] to-white to-25% h-full -z-10"
        />
        <div className="flex flex-col items-center justify-center w-full h-full mx-auto gap-[36px] mb-40">
          <h1 className="text-3xl font-bold font-headings lg:text-6xl">
            Generate your Custom Palette
          </h1>
          <Toaster />
          <ColorPicker />
          <SavePalette colors={colors} action={store.add}></SavePalette>
          <Palette colors={colors} variant="Primary" />
          <Button
            onClick={() => provider.setHexColor(controller.getRandom()!)}
            variant={"secondary"}
            className="rounded-[4px]"
          >
            Generate Random
            <Shuffle />
          </Button>
          <GraphicItems color={color} />
        </div>
      </section>
      <section>
        <SavePaletteSection />
      </section>
    </Layout>
  );
}

export default App;
