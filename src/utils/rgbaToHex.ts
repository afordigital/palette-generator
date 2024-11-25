export function rgbaToHex(rgba: number[], forceRemoveAlpha = false): string {
    const hex = rgba
        .filter((_, index) => !forceRemoveAlpha || index !== 3)
        .map((value, index) => index === 3 
            ? Math.round(value * 255)
            : value) 
        .map(value => value.toString(16))
        .map(hexString => hexString.length === 1 ? "0" + hexString : hexString)
        .join("");

    return `#${hex}`;
}
