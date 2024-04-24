'use client'
import PublicContextProvider from "@/context/public-context";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    return <PublicContextProvider>{children}</PublicContextProvider>
}