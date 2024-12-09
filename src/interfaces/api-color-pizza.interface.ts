export interface IApiColorPizza {
  paletteTitle: string;
  colors: Color[];
}

interface Color {
  name: string;
  hex: string;
  rgb: RGB;
  hsl: Hsl;
  lab: Lab;
  luminance: number;
  luminanceWCAG: number;
  bestContrast: string;
  swatchImg: SwatchImg;
  requestedHex: string;
  distance: number;
}

 interface Hsl {
  h: number;
  s: number;
  l: number;
}

 interface Lab {
  l: number;
  a: number;
  b: number;
}

 interface RGB {
  r: number;
  g: number;
  b: number;
}

 interface SwatchImg {
  svgNamed: string;
  svg: string;
}
