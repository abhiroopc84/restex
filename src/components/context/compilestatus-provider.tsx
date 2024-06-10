import { ReactNode, createContext, useState } from "react"

type compileStatus = "success" | "inprogress" | "notstarted"

type CompileStatusState = {
    compileStatus: compileStatus
    setCompileStatus: (compileStatus: (prev: compileStatus) => compileStatus) => void
}

const initialState: CompileStatusState = {
    compileStatus: "notstarted",
    setCompileStatus: () => null,
}

export const CompileStatusContext = createContext(initialState);

export const CompileStatusProvider = ({children} : {children:ReactNode}) => {
    const [compileStatus, setCompileStatus] = useState<compileStatus>("notstarted");

    return (
        <CompileStatusContext.Provider value={{compileStatus, setCompileStatus}}>
            {children}
        </CompileStatusContext.Provider>
    )
}