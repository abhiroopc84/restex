import { ReactNode, createContext, useState } from "react"

type sections = {
    id: number
    name: string
    type: string
    values: { [key: string]: any };
}[]

type SectionsState = {
    sections: sections
    setSections: (sections: (prev: sections) => sections) => void
}

const initialState: SectionsState = {
    sections: [{id: 0, name: "header", type: "header", values: {}}, { id: 1, name: "section1", type: "general", values: {} }],
    setSections: () => null,
}

export const SectionsContext = createContext(initialState);

export const SectionsProvider = ({children} : {children:ReactNode}) => {
    const [sections, setSections] = useState<sections>([{id: 0, name: "header", type: "header", values: {}},{ id: 1, name: "section1", type: "general", values: {} }]);

    return (
        <SectionsContext.Provider value={{sections, setSections}}>
            {children}
        </SectionsContext.Provider>
    )
}