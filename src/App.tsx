import "./App.css";

import {
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useState
} from "react";

import { SavePalette } from "@components/SavePalette.tsx";
import { Toaster } from "@components/shared/ui/sonner";
import { useLocation } from "wouter";
import { ValidateHexadecimal } from "./utils/hexadecimal-validator";

import chroma from "chroma-js";
import GraphicItems from "@components/GraphicItems";
import Layout from "./layouts/Layout";
import Palette from "@components/Palette";
import ColorPicker from "./components/color-picker/ColorPicker";
import { HexadecimalContext } from "./provider/hexadecimal/hexadecimal.context";
import SavePaletteSection from "./sections/SavePalette";

interface IAppOptions {
  title:string;
  subtitle:string;
}

const appOptions: IAppOptions = {
  title: "Generate your Custom Palette",
  subtitle: "Saved Palettes"
};


function App() {
  const provider = useContext(HexadecimalContext);
  
  const [ color, setColor ] = useState("#ffffff");
  const [ , setLocation ] = useLocation();

  const deferredColor = useDeferredValue(color);

  useEffect(() => {
    if (!ValidateHexadecimal(provider.hexColor)) return;

    // update all the component
    setColor(provider.hexColor);

    setLocation("?color=%23" + provider.hexColor.slice(1, 8));
  }, [ provider.hexColor, setLocation ]);
  

  const colors = useMemo(() => {
    return chroma
      .scale([ "#FFFFFF", deferredColor, "#000000" ])
      .colors(11)
      .slice(1, 10)
      .map((color) => {
        return {
          color,
          text: chroma.contrast(color, "#191919") > 4.5 ? "#191919" : "#FEFDFC",
        };
      });
  }, [ deferredColor ]);


  return (
    <Layout>
      <section className="pt-24 font-sans">
        <div
          style={{ "--color": deferredColor + "64" }}
          className="absolute inset-0 bg-gradient-to-b from-[var(--color)] to-white to-25% h-full -z-10"
        />
        <div className="flex flex-col items-center justify-center w-full h-full mx-auto gap-[36px] mb-40">
          <h1 className="text-3xl font-bold font-headings lg:text-6xl">
            {appOptions.title}
          </h1>
          <Toaster />
          <ColorPicker />
          <Palette colors={colors} variant="Primary" />
          <SavePalette colors={colors}></SavePalette>
          <GraphicItems color={deferredColor} />
        </div>
      </section>

      <section>
        <SavePaletteSection />
      </section>
    </Layout>
  );
}

export default App;
