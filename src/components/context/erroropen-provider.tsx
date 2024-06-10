import { ReactNode, createContext, useState } from "react"

type ErrorOpenState = {
    errorOpen: boolean
    setErrorOpen: (errorOpen: (prev: boolean) => boolean) => void
}

const initialState: ErrorOpenState = {
    errorOpen: false,
    setErrorOpen: () => null,
}

export const ErrorOpenContext = createContext(initialState);

export const ErrorOpenProvider = ({children} : {children:ReactNode}) => {
    const [errorOpen, setErrorOpen] = useState<boolean>(false);

    return (
        <ErrorOpenContext.Provider value={{errorOpen, setErrorOpen}}>
            {children}
        </ErrorOpenContext.Provider>
    )
}