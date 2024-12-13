import { createContext } from "react";

export interface IValuesProvider {
    hexColor:string;
    rgbColor: string;
    setHexColor: (hex: string, useDebounce?: boolean) => void;
}

const defaultValues:IValuesProvider = {
    hexColor: '',
    rgbColor: '',
    setHexColor: () => {}
};

export const HexadecimalContext = createContext(defaultValues);