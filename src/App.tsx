import "./App.css";

import {
  useCallback,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import { Button } from "@components/ui/button";
import { CopyPalette } from "@components/CopyPalette.tsx";
import { DeletePalette } from "@components/DeletePalette.tsx";
import { getRandomColor } from "@utils/getRandomColor";
import { SavePalette } from "@components/SavePalette.tsx";
import { Save, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@components/ui/sonner";
import { useLocation } from "wouter";
import chroma from "chroma-js";
import GraphicItems from "@components/GraphicItems";
import Layout from "./layouts/Layout";
import Palette from "@components/Palette";
import store, { type Palettes } from "@utils/palettes";
import LittlePalette from "./components/LittlePalette";
import { EditPaletteName } from "./components/EditPaletteName";
import { ValidateHexadecimal } from "./utils/hexadecimal-validator";
import { HexadecimalContext } from "./provider/hexadecimal/hexadecimal.context";
import ColorPicker from "./components/ColorPicker";

class AppFunctionalities {
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
}

const appFunctionalities: AppFunctionalities = new AppFunctionalities();

function App() {
  const provider = useContext(HexadecimalContext);
  const [, setLocation] = useLocation();

  const [color, setColor] = useState("#ffffff");
  

  const [isEditNamePalette, setIsEditNamePalette] = useState("");
  const [valueEditNamePalette, setValueEditNamePalette] = useState("");

  const deferredColor = useDeferredValue(color);

  const colors = useMemo(() => appFunctionalities.getColor(deferredColor), [ deferredColor ]);

  const handledEditNamePalette = (name: string) => {
    setIsEditNamePalette(name);
    setValueEditNamePalette(name);
  };

  const savedPalettes = useSyncExternalStore<Palettes>(
    store.subscribe,
    store.getSnapshot
  );

  const isValid = useCallback((newColor: string) => {
    const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    if (regex.test(newColor)) {
      setColor(newColor);
      setLocation("?color=%23" + newColor.slice(1, 8));
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (!ValidateHexadecimal(provider.hexColor)) return;

    // update all the component
    setColor(provider.hexColor);

    setLocation("?color=%23" + provider.hexColor.slice(1, 8));
  }, [ provider.hexColor, setLocation ]);


  const handleGenerateRandom = () => {
    const newColor = getRandomColor();
    isValid(newColor);
  };

  return (
    <Layout>
      <section className="pt-24 font-sans">
        <div
          style={{ "--color": deferredColor + "64" }}
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
            onClick={handleGenerateRandom}
            variant={"secondary"}
            className="rounded-[4px]"
          >
            Generate Random
            <Shuffle />
          </Button>
          <GraphicItems color={deferredColor} />
        </div>
      </section>
      <section className="flex gap-[32px] min-h-screen">
        {savedPalettes && Object.keys(savedPalettes).length > 0 && (
          <div className="flex flex-col w-full gap-4">
            <h2 className="pb-6 text-4xl font-bold font-headings">
              Saved Palettes
            </h2>
            <div className="flex flex-wrap justify-between w-full max-w-full gap-y-8">
              {Object.entries(savedPalettes).map(([name, palette]) => {
                return (
                  <div key={name} className="flex flex-col gap-[12px]">
                    <div className="flex justify-between ">
                      {isEditNamePalette !== "" &&
                      isEditNamePalette === name ? (
                        <label
                          className={`flex rounded-[4px] border-2 w-60 ${
                            isEditNamePalette !== "" ? " border-black" : ""
                          }`}
                        >
                          <input
                            type="text"
                            value={valueEditNamePalette}
                            onChange={(event) => {
                              setValueEditNamePalette(event.target.value);
                            }}
                            className="px-2 mb-1 font-semibold bg-transparent outline-none text-md"
                            placeholder={"..."}
                            autoFocus
                            onBlur={() => {
                              setIsEditNamePalette("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const isError = store.updatePaletteName(
                                  name,
                                  valueEditNamePalette
                                );
                                if (isError !== "") {
                                  toast.error(isError);
                                }
                                setIsEditNamePalette("");
                              } else if (e.key === "Escape") {
                                setValueEditNamePalette("");
                                setIsEditNamePalette("");
                              }
                            }}
                          />
                        </label>
                      ) : (
                        <h4
                          className="w-full font-semibold cursor-pointer text-md"
                          onClick={() => {
                            setColor(palette[500]);
                          }}
                          onDoubleClick={() => {
                            handledEditNamePalette(name);
                          }}
                        >
                          {name.replaceAll("-", " ")}
                        </h4>
                      )}
                      {!(
                        isEditNamePalette !== "" && isEditNamePalette === name
                      ) ? (
                        <div className="flex">
                          <EditPaletteName />
                          <CopyPalette
                            colors={Object.entries(palette).map(
                              ([, color]) => ({
                                color,
                                text:
                                  chroma.contrast(color, "#191919") > 4.5
                                    ? "#191919"
                                    : "#FEFDFC",
                              })
                            )}
                          ></CopyPalette>
                          <DeletePalette
                            name={name}
                            action={store.rem}
                          ></DeletePalette>
                        </div>
                      ) : (
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          className="ml-2 rounded-[4px]"
                        >
                          <Save />
                        </Button>
                      )}
                    </div>
                    <LittlePalette
                      colors={Object.entries(palette).map(([, color]) => ({
                        color,
                        text:
                          chroma.contrast(color, "#191919") > 4.5
                            ? "#191919"
                            : "#FEFDFC",
                      }))}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default App;
