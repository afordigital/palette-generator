import { useState, useSyncExternalStore } from "react";
import store, { type Palettes } from "@utils/palettes";
import { CopyPalette } from "@components/CopyPalette.tsx";
import { DeletePalette } from "@components/DeletePalette.tsx";
import { toast } from "sonner";
import chroma from "chroma-js";
import Palette from "@/components/Palette";


function SavePaletteSection() {
    const [ isEditNamePalette, setIsEditNamePalette ] = useState("");
    const [ valueEditNamePalette, setValueEditNamePalette ] = useState("");

    const handledEditNamePalette = (name: string) => {
        setIsEditNamePalette(name);
        setValueEditNamePalette(name);
      };
    
      const savedPalettes = useSyncExternalStore<Palettes>(
        store.subscribe,
        store.getSnapshot
      );

  return (
    <div className="flex gap-[48px] min-h-screen">
        {savedPalettes && Object.keys(savedPalettes).length > 0 && (
          <div className="flex flex-col w-full gap-4">
            <h2 className="pb-6 text-4xl font-bold font-headings">
                Saved Palettes
            </h2>
            <div className="grid gap-x-8 gap-y-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-content-center w-full">
              {Object.entries(savedPalettes).map(([ name, palette ]) => {
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
                                const isError = store.updatePaletteName(name,valueEditNamePalette);
                                if (isError !== "") toast.error(isError);
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
                              ([ , color ]) => ({
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
                      colors={Object.entries(palette).map(([ , color ]) => ({
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
    </div>
  );
}

export default SavePaletteSection;