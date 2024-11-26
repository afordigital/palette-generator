export function hexToHWB(hex: string) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }

    // if (hex.length !== 6) {
    //     throw new Error("hexadecimal format invalid");
    // }

    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;

    if (delta !== 0) {
        if (max === r) {
            h = ((g - b) / delta + (g < b ? 6 : 0));
        } else if (max === g) {
            h = ((b - r) / delta + 2);
        } else {
            h = ((r - g) / delta + 4);
        }
        h *= 60;
    }

    const whiteness = min * 100; 
    const blackness = (1 - max) * 100;

    h = Math.round(h);
    const w = Math.round(whiteness);
    const bValue = Math.round(blackness);

    return `hwb(${h},${w},${bValue})`;
}

