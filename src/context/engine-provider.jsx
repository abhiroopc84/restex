import { createContext, useState } from "react"
import { PdfTeXEngine } from "@/utils/swiftlatex/PdfTeXEngine";


const initialState = {
    engine: new PdfTeXEngine(),
    setEngine: () => null,
}

export const EngineContext = createContext(initialState);

export const EngineProvider = ({children}) => {
    const [engine, setEngine] = useState(new PdfTeXEngine());

    return (
        <EngineContext.Provider value={{engine, setEngine}}>
            {children}
        </EngineContext.Provider>
    )
}