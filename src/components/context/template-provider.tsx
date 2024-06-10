import { ReactNode, createContext, useState } from "react"

type TemplateState = {
    template: string
    setTemplate: (template: (prev: string) => string) => void
}

const initialState: TemplateState = {
    template: "faangpath",
    setTemplate: () => null,
}

export const TemplateContext = createContext(initialState);

export const TemplateProvider = ({children} : {children:ReactNode}) => {
    const [template, setTemplate] = useState<string>("faangpath");

    return (
        <TemplateContext.Provider value={{template, setTemplate}}>
            {children}
        </TemplateContext.Provider>
    )
}