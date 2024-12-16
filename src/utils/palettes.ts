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

let palettes: Palettes = JSON.parse(localStorage.getItem('palettes')!) || {} ;

type Listener = () => void;
type Unsubscribe = () => void;

let listeners: Listener[] = [] ;

function emit() {
  for (const listener of listeners) {
    listener() ;
  }
}
 
class PalettesStore implements Store {  
  public add(name: string, palette: Palette):void{
    palettes = { ...palettes, [name]: palette };
    emit() ;
    localStorage.setItem('palettes', JSON.stringify(palettes)) ;
  };

  public rem(name: string): void{
    palettes = Object.keys(palettes).reduce((acc, key) => {
      if (key !== name) acc[key] = palettes[key] ;
      return acc ;
    }, {} as Palettes) ;
    emit() ;
    localStorage.setItem('palettes', JSON.stringify(palettes)) ;
  };

  private getName(key: string, oldName: string, acc: Palettes, newName: string): Palettes {
      if (key === oldName) {
        acc[newName] = palettes[key] ;
      } else {
        acc[key] = palettes[key] ;
      }
      return acc ;
  }

  public updatePaletteName(oldName: string, newName: string): string {
    newName = newName.trim() ;
    // Verify errors
    if (palettes[newName]) return `The name "${newName}" already exists! 🐭` ;
    if (newName === '') return 'The name cannot be empty! 🐭' ;

    // Update the name of the palette
    if (palettes[oldName]) {
      const updatedPalettes = Object.keys(palettes) 
      .reduce((acc, key) => this.getName(key, oldName, acc, newName), {} as Palettes) ;

      palettes = updatedPalettes ;

      emit() ;
      localStorage.setItem('palettes', JSON.stringify(palettes)) ;
    }
    
    return '' ;
  };

  public subscribe(listener: Listener): Unsubscribe{
    listeners.push(listener) ;

    return () => {listeners = listeners.filter(l => l !== listener) ;} ;
  };

  public getSnapshot(): Palettes {
    return palettes;
  }
}

const store: Store = new PalettesStore() ;

export default store ;
