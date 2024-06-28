'use client'

import { signIn, useSession } from "next-auth/react";
import SignUpPage from "../SignUpPage";

export default function SignUpGooglePage() {
    const { data: session } = useSession();
    if(session === null)
        signIn('google');

    return <SignUpPage byGoogle={true} />
}