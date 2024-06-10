import { ReactNode, createContext, useState } from "react"

type YamlState = {
    yaml: string
    setYaml: (yaml: (prev: string) => string) => void
}

const initialState: YamlState = {
    yaml: "",
    setYaml: () => null,
}

export const YamlContext = createContext(initialState);

export const YamlProvider = ({children} : {children:ReactNode}) => {
    const [yaml, setYaml] = useState<string>("");

    return (
        <YamlContext.Provider value={{yaml, setYaml}}>
            {children}
        </YamlContext.Provider>
    )
}