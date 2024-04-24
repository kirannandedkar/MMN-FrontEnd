'use client'

import { ReactNode, createContext, useState } from "react";

interface PublicContextI {
    isCurtainClicked: boolean
    setIsCurtainClicked: Function
}
const defaultValues = {
    isCurtainClicked: false,
    setIsCurtainClicked: () => { }
}

export const PublicContext = createContext<PublicContextI>(defaultValues)

const PublicContextProvider = ({ children }: { children: ReactNode }) => {
    const [isCurtainClicked, setIsCurtainClicked] = useState<boolean>(false)

    return <PublicContext.Provider
        value={{ isCurtainClicked, setIsCurtainClicked }}>{children}</PublicContext.Provider>
}

export default PublicContextProvider