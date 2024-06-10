import { ReactNode, createContext, useState } from "react"

type PdfurlState = {
    pdfurl: string
    setPdfurl: (pdfurl: (prev: string) => string) => void
}

const initialState: PdfurlState = {
    pdfurl: "",
    setPdfurl: () => null,
}

export const PdfurlContext = createContext(initialState);

export const PdfurlProvider = ({children} : {children:ReactNode}) => {
    const [pdfurl, setPdfurl] = useState<string>("");

    return (
        <PdfurlContext.Provider value={{pdfurl, setPdfurl}}>
            {children}
        </PdfurlContext.Provider>
    )
}