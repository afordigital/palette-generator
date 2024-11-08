export interface Palette {
  [key: number]: string
}

export interface Palettes {
  [key: string]: Palette
}

type Listener = () => void;
type Unsubscribe = () => void;

let palettes: Palettes = JSON.parse(localStorage.getItem('palettes')!) || {};
let listeners: Listener[] = [];

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

const store: {
  add: (name: string, palette: Palette) => void,
  rem: (name: string) => void,
  subscribe: (listener: Listener) => Unsubscribe,
  getSnapshot: () => Palettes
} = {
  add(name, palette) {
    palettes = {...palettes, [name]: palette};
    emit();
    localStorage.setItem('palettes', JSON.stringify(palettes));
  },
  rem(name) {
    palettes = Object.keys(palettes).reduce((acc, key) => {
      if (key !== name) {
        acc[key] = palettes[key];
      }
      return acc;
    }, {} as Palettes);
    emit();
    localStorage.setItem('palettes', JSON.stringify(palettes));
  },
  subscribe(listener) {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },
  getSnapshot() {
    return palettes;
  },
}

export default store;
