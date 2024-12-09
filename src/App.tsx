import "./App.css";

import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Button } from "@/components/shared/ui/button";
import { SavePalette } from "@/components/save-palette/SavePalette";
import { Shuffle } from "lucide-react";
import { Toaster } from "@/components/shared/ui/sonner";
import { useLocation } from "wouter";
import { ValidateHexadecimal } from "./utils/hexadecimal-validator";
import { HexadecimalContext } from "./provider/hexadecimal/hexadecimal.context";
import { Footer } from "./sections/footer/Footer";

import GraphicItems from "@components/graphic-items/GraphicItems";
import Layout from "./layouts/Layout";
import Palette from "@/components/palette/Palette";
import store from "@utils/palettes";
import ColorPicker from "./components/color-picker/ColorPicker";
import SavePaletteSection from "./sections/save-palette-section/SavePaletteSection";
import PromptDialog from "./components/prompt-dialog/PromptDialog";
import AppController from "./app.controller";


const controller: AppController = new AppController();

function App() {
  const provider = useContext(HexadecimalContext);

  const [ , setLocation ] = useLocation();

  const [ color, setColor ] = useState("#ffffff");

  const [ showPromptDialog, setShowPromptDialog ] = useState(false);
  const [ isGenerating, setIsGenerating ] = useState(false);

  const colors = useMemo(() => controller.getColor(color), [ color ]);

  useEffect(() => {
    if (!ValidateHexadecimal(provider.hexColor)) return;

    setColor(provider.hexColor);

    setLocation("?color=%23" + provider.hexColor.slice(1, 8));
  }, [ provider.hexColor, setLocation ]);

  const handleGenerateAI = () => setShowPromptDialog(true);

  const handlePromptSubmit = async (color: string) => {
    setIsGenerating(false);
    setShowPromptDialog(false);
    
    if (ValidateHexadecimal(color)) setColor(provider.hexColor);
  };

  return (
    <Layout>
      <section className="pt-24 font-sans">
        <div
          style={{ "--color": color + "64" }}
          className="absolute inset-0 bg-gradient-to-b from-[var(--color)] to-white to-25% -z-10"
        />
        <div className="flex flex-col items-center justify-center w-full mx-auto gap-[36px] mb-10">
          <h1 className="text-3xl font-bold font-headings lg:text-6xl">
            Generate your Custom Palette
          </h1>
          <Toaster />
          <ColorPicker />
          <SavePalette colors={colors} action={store.add}></SavePalette>
          <Palette colors={colors} variant="Primary" />
          <div className="flex gap-2">
            <Button
              onClick={() => provider.setHexColor(controller.getRandom()!)}
              variant={"secondary"}
              className="rounded-[4px]"
            >
              Generate Random
              <Shuffle />
            </Button>

            <Button
                onClick={handleGenerateAI}
                variant={"secondary"}
                className="rounded-[4px]"
              >
                Generate with AI
            </Button>
          </div>
          <GraphicItems color={color} />
        </div>
      </section>
      <section>
        <SavePaletteSection />
      </section>
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
