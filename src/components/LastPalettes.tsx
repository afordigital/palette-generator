type LastPalettesProps = {
  lastPalettes: string[];
};

export const LastPalettes = ({ lastPalettes }: LastPalettesProps) => {
  console.log(lastPalettes);
  return (
    <>
      {lastPalettes.length !== 0 && (
        <div>
          <p>New palettes blablablabla</p>
        </div>
      )}
    </>
  );
};
