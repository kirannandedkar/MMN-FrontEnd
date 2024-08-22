'use client';

import PublicContextProvider from "@/context/public-context";
import { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { ReLogin } from "@/redux/user/auth.action";

export default function Providers({ children }: { children: ReactNode }) {
    const authresult = useSelector((state: any) => state.auth.authresult);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!authresult) {
            dispatch(ReLogin());
        }
    }, [authresult, dispatch]);

    return <PublicContextProvider>{children}</PublicContextProvider>;
}
