
import { useEffect, useState } from "react";
import { HexadecimalContext, IValuesProvider } from "./hexadecimal.context";
import { debounce } from "@/utils/debounce";
import { getRandomColor } from "@/utils/getRandomColor";
import { ValidateHexadecimal } from "@/utils/hexadecimal-validator";

interface IHexadecimalProviderProps {
    children: React.ReactNode
}

class ProviderHandlers {
    public verifyColorEntered(callback: (hex:string) => void){
        const search = window.location.search;
        let queryString = new URLSearchParams(search).get("color");
    
        if (!queryString) queryString = getRandomColor();
        
        if (ValidateHexadecimal(queryString)) callback(queryString);
    }
}

const providerHandler: ProviderHandlers = new ProviderHandlers();

function HexadecimalProvider({children}: IHexadecimalProviderProps) {
    const [ hexColor, setHexColor ] = useState<string>("");

    useEffect(() => {
        providerHandler.verifyColorEntered(setHexColor);
    },[]);
    

    const values:IValuesProvider = {
        hexColor,
        rgbColor: "",
        setHexColor: (hex:string) => debounce({callback: () => setHexColor(hex)})
    };

    return (
        <HexadecimalContext.Provider value={values}>
            {children}
        </HexadecimalContext.Provider>
    );
}

export default HexadecimalProvider;