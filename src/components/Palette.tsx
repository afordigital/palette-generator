type PaletteProps = {
  lightScale: string[];
  color: string;
  darkScale: string[];
};

export const Palette = ({ lightScale, color, darkScale }: PaletteProps) => {
  return (
    <article className="flex">
      {lightScale.map((color) => {
        return (
          <div
            style={{ backgroundColor: color }}
            className="w-[100px] h-[100px]"
          ></div>
        );
      })}
      <div
        style={{ backgroundColor: color }}
        className="w-[100px] h-[100px]"
      ></div>
      {darkScale.map((color) => {
        return (
          <div
            style={{ backgroundColor: color }}
            className="w-[100px] h-[100px]"
          ></div>
        );
      })}
    </article>
  );
};
