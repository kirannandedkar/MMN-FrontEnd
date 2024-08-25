'use client'

import { useSession } from "next-auth/react";

import {useDispatch, useSelector,} from 'react-redux'
import { AppDispatch } from "@/redux/store";
import { SignInGoogle } from "@/redux/user/auth.action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function LoginGooglePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
   
    useEffect(() => {
        if(session){
            dispatch(SignInGoogle());
            router.push('/');
        }
    }, [session]);

    return <Loader/>
}