import { ReactNode, createContext, useState } from "react"

type LatexState = {
    latex: string
    setLatex: (latex: (prev: string) => string) => void
}

const initialState: LatexState = {
    latex: "",
    setLatex: () => null,
}

export const LatexContext = createContext(initialState);

export const LatexProvider = ({children} : {children:ReactNode}) => {
    const [latex, setLatex] = useState<string>("");

    return (
        <LatexContext.Provider value={{latex, setLatex}}>
            {children}
        </LatexContext.Provider>
    )
}