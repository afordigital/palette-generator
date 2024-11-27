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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Footer } from "./components/Footer";
import ApiKeyDialog from "@components/ApiKeyDialog";
import PromptDialog from "@components/PromptDialog";
import geminiStore from "@utils/gemini-store";

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

  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [showPromptDialog, setShowPromptDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleGenerateAI = () => {
    const apiKey = geminiStore.getApiKey();
    if (!apiKey) {
      setShowApiKeyDialog(true);
    } else {
      setShowPromptDialog(true);
    }
  };

  const handlePromptSubmit = async (color: string) => {
    setIsGenerating(false);
    setShowPromptDialog(false);
    isValid(color);
  };

  return (
    <Layout>
      <section className="pt-24 font-sans">
        <div
          style={{ "--color": deferredColor + "64" }}
          className="absolute inset-0 bg-gradient-to-b from-[var(--color)] to-white to-25% -z-10"
        />
        <div className="flex flex-col items-center justify-center w-full mx-auto gap-[36px] mb-10">
          <h1 className="text-3xl font-bold font-headings lg:text-6xl">
            Generate your Custom Palette
          </h1>
          <Toaster />
          <div className="flex flex-col items-center gap-2 md:flex-row">
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
                className="py-[6px] pl-16 font-mono border-[1px] border-slate-700 rounded-[4px]"
              />
            </label>
            <SavePalette colors={colors} action={store.add}></SavePalette>
          </div>
          <Palette colors={colors} variant="Primary" />
          <div className="flex gap-2">
            <Button
              onClick={handleGenerateRandom}
              variant={"secondary"}
              className="rounded-[4px]"
            >
              Generate Random
              <Shuffle className="ml-2" />
            </Button>
            <Button
              onClick={handleGenerateAI}
              variant={"secondary"}
              className="rounded-[4px]"
            >
              Generate with AI
            </Button>
          </div>
          <GraphicItems color={deferredColor} />
        </div>
      </section>
      <section className="flex gap-[32px]">
        {savedPalettes && Object.keys(savedPalettes).length > 0 && (
          <div className="flex flex-col w-full gap-4">
            <h2 className="pb-6 text-4xl font-bold font-headings">
              Saved Palettes
            </h2>
            <div className="flex flex-wrap gap-[70px] w-full max-w-full gap-y-8">
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
                        <TooltipProvider>
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger>
                              <h4
                                className="w-full font-semibold cursor-pointer text-slate-700 hover:text-slate-900 text-md"
                                onClick={() => {
                                  setColor(palette[500]);
                                }}
                                onDoubleClick={() => {
                                  handledEditNamePalette(name);
                                }}
                              >
                                {name.replaceAll("-", " ")}
                              </h4>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="px-2 py-1 text-[12px] text-white rounded-[4px] bg-slate-800">
                                Select palette
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
      <ApiKeyDialog
        open={showApiKeyDialog}
        onSubmit={(apiKey) => {
          geminiStore.setApiKey(apiKey);
          setShowApiKeyDialog(false);
        }}
        onCancel={() => setShowApiKeyDialog(false)}
        setShowPromptDialog={setShowPromptDialog}
      />
      <PromptDialog
        open={showPromptDialog}
        onSubmit={handlePromptSubmit}
        onCancel={() => {
          setShowPromptDialog(false);
          setIsGenerating(false);
        }}
        isLoading={isGenerating}
        setIsLoading={setIsGenerating}
      />
      <Footer />
    </Layout>
  );
}

export default App;
