import {Palettes} from "@/utils/palettes.ts";

type SavedPalettesProps = {
  savedPalettes: Palettes;
};

export const SavedPalettes = ({ savedPalettes }: SavedPalettesProps) => {
  return (
    <>
      {Object.keys(savedPalettes).length > 0 && (
        <div>
          Saved palettes: {Object.keys(savedPalettes).join(', ')}
        </div>
      )}
    </>
  );
};
