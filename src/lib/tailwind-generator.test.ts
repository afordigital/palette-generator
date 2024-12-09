import { describe, expect, test } from 'vitest';
import { tailwindGenerator } from './tailwindGenerator';


describe('./src/lib/tailwindGenerator.ts', () => {
    const palettesList = [
        { color: '#e2f5dd', text: '#191919' },
        { color: '#c6ecbb', text: '#191919' },
        { color: '#a9e299', text: '#191919' },
        { color: '#8dd977', text: '#191919' },
        { color: '#70cf55', text: '#191919' },
        { color: '#5aa644', text: '#191919' },
        { color: '#437c33', text: '#FEFDFC' },
        { color: '#2d5322', text: '#FEFDFC' },
        { color: '#162911', text: '#FEFDFC' }
    ];

    const colors = {
        '100': '#e2f5dd',
        '200': '#c6ecbb',
        '300': '#a9e299',
        '400': '#8dd977',
        '500': '#70cf55',
        '600': '#5aa644',
        '700': '#437c33',
        '800': '#2d5322',
        '900': '#162911'
    };

    const normalizedName = "green-flash";

    test('should return both a color name and a color palette', async () => {
        const [ name, palette ] = await tailwindGenerator(palettesList); 

        expect(name).toBe(normalizedName);
        expect(palette).toEqual(colors);
    });
});