import { createContext } from "react";

export interface IValuesProvider {
    hexColor:string;
    rgbColor: string;
    setHexColor: (hex:string) => void;
}

const defaultValues:IValuesProvider = {
    hexColor: '',
    rgbColor: '',
    setHexColor: () => {}
};

export const HexadecimalContext = createContext(defaultValues);