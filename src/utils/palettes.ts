export interface Palette {
  [key: number]: string
}

export interface Palettes {
  [key: string]: Palette
}

interface Store {
  add: (name: string, palette: Palette) => void,
  rem: (name: string) => void,
  updatePaletteName: (oldName: string, newName: string) => string,
  subscribe: (listener: Listener) => Unsubscribe,
  getSnapshot: () => Palettes
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

const store: Store = {
  add(name, palette) {
    palettes = { ...palettes, [name]: palette };
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
  updatePaletteName(oldName, newName) {
    newName = newName.trim();
    // Verify errors
    if (palettes[newName]) {
      return `The name "${newName}" already exists! 🐭`;
    }
    if (newName === '') {
      return 'The name cannot be empty! 🐭';
    }
    // Update the name of the palette
    if (palettes[oldName]) {
      const updatedPalettes = Object.keys(palettes).reduce((acc, key) => {
        if (key === oldName) {
          acc[newName] = palettes[key];
        } else {
          acc[key] = palettes[key];
        }
        return acc;
      }, {} as Palettes);

      palettes = updatedPalettes;

      emit();
      localStorage.setItem('palettes', JSON.stringify(palettes));
    }
    return '';
  },
  subscribe(listener) {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return palettes;
  },
};

export default store;
