import { CopyPalette } from "@/components/copy-palette/CopyPalette";
import { DeletePalette } from "@/components/delete-palette/DeletePalette";
import { EditPaletteName } from "@/components/edit-palette-name/EditPaletteName";
import { Button } from "@/components/shared/ui/button";
import { SavePaletteSectionController } from "./save-palette-section.controller";
import { HexadecimalContext } from "@/provider/hexadecimal/hexadecimal.context";
import { Save } from "lucide-react";
import { KeyboardEvent, useContext, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import store, { Palettes } from "@/utils/palettes";

import LittlePalette from "@/components/little-palette/LittlePalette";

interface IEditPaletteNameProps {
    valueEditNamePalette: string;
    name: string;
    setIsEditNamePalette: (value: string) => void;
    setValueEditNamePalette: (value: string) => void;
    isEditNamePalette: string;
}

const NamePalette = (props: IEditPaletteNameProps) => {
    const handlerOnKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const isError = store.updatePaletteName(
                props.name,
                props.valueEditNamePalette
            );
            if (isError !== "") {
                toast.error(isError);
            }
            props.setIsEditNamePalette("");
        } else if (e.key === "Escape") {
            props.setValueEditNamePalette("");
            props.setIsEditNamePalette("");
        }
    };

    return (
        <label
            className={`flex rounded-[4px] border-2 w-60 
                ${props.isEditNamePalette !== "" ? " border-black" : ""}`}
        >
            <input
                type="text"
                value={props.valueEditNamePalette}
                onChange={(event) => props.setValueEditNamePalette(event.target.value)}
                className="px-2 mb-1 font-semibold bg-transparent outline-none text-md"
                placeholder="type a palette name"
                autoFocus
                onBlur={() => props.setIsEditNamePalette("")}
                onKeyDown={handlerOnKeydown}
            />
        </label>
    );
};

const controller: SavePaletteSectionController = new SavePaletteSectionController();

const SavePaletteSection = () => {
    const provider = useContext(HexadecimalContext);

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
        <div className="flex gap-[32px] min-h-screen">
            {savedPalettes && Object.keys(savedPalettes).length > 0 && (
                <div className="flex flex-col w-full gap-4">
                    <h2 className="pb-6 text-4xl font-bold font-headings">
                        Saved Palettes
                    </h2>
                    <div className="flex flex-wrap justify-between w-full max-w-full gap-y-8">
                        {Object.entries(savedPalettes).map(([ name, palette ]) => {
                            return (
                                <div key={name} className="flex flex-col gap-[12px]">
                                    <div className="flex justify-between">

                                    {isEditNamePalette !== "" && isEditNamePalette === name 
                                        ? 
                                            (
                                                <NamePalette
                                                    name={name}
                                                    setIsEditNamePalette={setIsEditNamePalette}
                                                    setValueEditNamePalette={setValueEditNamePalette}
                                                    valueEditNamePalette={valueEditNamePalette}
                                                    isEditNamePalette={isEditNamePalette}
                                                />
                                            ) 
                                        : 
                                            (
                                                <h4
                                                    className="w-full font-semibold cursor-pointer text-md"
                                                    onClick={() => provider.setHexColor(palette[500])}
                                                    onDoubleClick={() => handledEditNamePalette(name)}
                                                >
                                                    {name.replaceAll("-", " ")}
                                                </h4>
                                            )
                                        }

                                    {!(isEditNamePalette !== "" && isEditNamePalette === name) 
                                        ? 
                                            (
                                                <div className="flex">
                                                    <EditPaletteName />
                                                    <CopyPalette
                                                        colors={controller.copyPaletteColors(palette)}
                                                    />
                                                    <DeletePalette
                                                        name={name}
                                                        action={store.rem}
                                                    />
                                                </div>
                                            ) 
                                        : 
                                            (
                                                <Button
                                                    size={"sm"}
                                                    variant={"outline"}
                                                    className="ml-2 rounded-[4px]"
                                                >
                                                    <Save />
                                                </Button>
                                            )
                                        }
                                    </div>

                                    <LittlePalette
                                        colors={controller.littlePaletteColors(palette)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavePaletteSection;
