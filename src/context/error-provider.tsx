import { ReactNode, createContext, useState } from "react"

type ErrorState = {
    error: string
    setError: (error: (prev: string) => string) => void
}

const initialState: ErrorState = {
    error: "",
    setError: () => null,
}

export const ErrorContext = createContext(initialState);

export const ErrorProvider = ({children} : {children:ReactNode}) => {
    const [error, setError] = useState<string>("");

    return (
        <ErrorContext.Provider value={{error, setError}}>
            {children}
        </ErrorContext.Provider>
    )
}