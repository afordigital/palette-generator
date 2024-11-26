export function isDarkColor(hexColor: string) {
    hexColor = hexColor.replace("#", "");
  
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
  
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance < 128;
}