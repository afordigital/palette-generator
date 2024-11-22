import "./App.css";

import {
  ChangeEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import { Button } from "@components/ui/button";
import { CopyPalette } from "@components/CopyPalette.tsx";
import { debounce } from "@utils/debounce";
import { DeletePalette } from "@components/DeletePalette.tsx";
import { getRandomColor } from "@utils/getRandomColor";
import { SavePalette } from "@components/SavePalette.tsx";
import { Shuffle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@components/ui/sonner";
import { useLocation } from "wouter";
import chroma from "chroma-js";
import GraphicItems from "@components/GraphicItems";
import Layout from "./layouts/Layout";
import Palette from "@components/Palette";
import store, { type Palettes } from "@utils/palettes";

function App() {
  const [color, setColor] = useState("#ffffff");
  const [colorAux, setColorAux] = useState(color);
  const deferredColor = useDeferredValue(color);

  const [isEditNamePalette, setIsEditNamePalette] = useState("");
  const [valueEditNamePalette, setValueEditNamePalette] = useState("");
  const handledEditNamePalette = (name: string) => {
    setIsEditNamePalette(name);
    setValueEditNamePalette(name);
  };

  const savedPalettes = useSyncExternalStore<Palettes>(
    store.subscribe,
    store.getSnapshot
  );

  const [, setLocation] = useLocation();

  const colors = useMemo(() => {
    return chroma
      .scale(["#FFFFFF", deferredColor, "#000000"])
      .colors(11)
      .slice(1, 10)
      .map((color) => {
        return {
          color,
          text: chroma.contrast(color, "#191919") > 4.5 ? "#191919" : "#FEFDFC",
        };
      });
  }, [deferredColor, colorAux]);

  const isValid = useCallback((newColor: string) => {
    const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    if (regex.test(newColor)) {
      setColor(newColor);
      setColorAux(newColor);
      setLocation("?color=%23" + newColor.slice(1, 8));
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    const search = window.location.search;
    const queryString = new URLSearchParams(search).get("color");
    if (!queryString) {
      handleGenerateRandom();
    } else {
      const newColor = queryString;
      isValid(newColor);
    }
  }, []);

  const handleColorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;

      debounce({
        callback: () => isValid(newColor),
      });
    },
    []
  );

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    if (newColor.length > 7) return;
    setColorAux(newColor);
    isValid(newColor);
  };

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
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <Button
              onClick={handleGenerateRandom}
              variant={"secondary"}
              className="rounded-[4px]"
            >
              Generate Random
              <Shuffle />
            </Button>
            <label htmlFor="current-colors" className="relative">
              <input
                type="color"
                value={deferredColor}
                onChange={handleColorChange}
                className="absolute left-2 top-[6px]"
              ></input>
              <input
                id="current-color"
                value={colorAux}
                onChange={handleTextInputChange}
                placeholder="#FDA12D"
                className="py-[6px] pl-16 border-[1px] border-slate-700 rounded-[4px]"
              />
            </label>
          </div>

          <Palette colors={colors} variant="Primary" />
          <SavePalette colors={colors} action={store.add}></SavePalette>
          <GraphicItems color={deferredColor} />
        </div>
      </section>
      <section className="flex gap-[48px] min-h-screen">
        {savedPalettes && Object.keys(savedPalettes).length > 0 && (
          <div className="flex flex-col w-full gap-4">
            <h2 className="pb-6 text-4xl font-bold font-headings">
              Saved Palettes
            </h2>
            <div className="grid gap-x-8 gap-y-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-content-center w-full">
              {Object.entries(savedPalettes).map(([name, palette]) => {
                return (
                  <div key={name} className="flex flex-col gap-[12px]">
                    <div className="flex justify-between">
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
                          className="w-full font-semibold text-md"
                          onDoubleClick={() => {
                            handledEditNamePalette(name);
                          }}
                        >
                          {name.replaceAll("-", " ")}
                        </h4>
                      )}
                      {!(
                        isEditNamePalette !== "" && isEditNamePalette === name
                      ) && (
                        <div className="flex">
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
                      )}
                    </div>
                    <Palette
                      variant="Secondary"
                      position="start"
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
