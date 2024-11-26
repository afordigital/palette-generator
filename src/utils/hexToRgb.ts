export function hexToRgb(hex:string):string {
    const validHex = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;
    if (!validHex.test(hex)) {
        throw new Error("Hex is not valid");
    }

    hex = hex.replace(/^#/, "");

    if (hex.length === 3) {
        hex = hex.split("").map(char => char + char).join("");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r},${g},${b})`;
}
