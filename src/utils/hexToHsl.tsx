export function hexToHSL(hex: string) {
    hex = hex.replace(/^#/, '');
    
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }

    // if (hex.length !== 6) {
    //     throw new Error("hexadecimal format is invalid.");
    // }

    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let l = (max + min) / 2;

    let h = 0;
    let s = 0;

    if (delta !== 0) {
        if (max === r) {
            h = ((g - b) / delta + (g < b ? 6 : 0));
        } else if (max === g) {
            h = ((b - r) / delta + 2);
        } else {
            h = ((r - g) / delta + 4);
        }
        h *= 60;

        s = delta / (1 - Math.abs(2 * l - 1));
    }

    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h},${s},${l})`;
}

