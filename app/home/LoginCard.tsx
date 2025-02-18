"use client"

import MMNTitle from "@/components/MMNTItle";
import MMNPanel from "@/components/MMNPanel";
import MMNButton from "@/components/MMNButton";
import GoogleButton from "@/components/GoogleButton";
import {useEffect, useState} from "react";
import {useDispatch, useSelector,} from 'react-redux'
import { AppDispatch } from "@/redux/store";
import { SignInGoogle, SignInManualy } from "@/redux/user/auth.action";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";
import {GET} from "@/utils/fetch-factory";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface IProps{
    onClose: () => void
}
const  LoginCard = ({onClose}: IProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authresult } = useSelector((state: any) => state.auth);

    const signinManually = () => {
        if(!email || !password) {
            toast.info('Input Email or Password');
            return;
        }
        dispatch(SignInManualy({ email, password }));
    }

    const signinGoogle = () => {
        signIn("google", {
            redirect: false,
            callbackUrl:
              process.env.NEXT_PUBLIC_SITE_ROOT + "login/google",
          })
    }

    const handleMembership = () => {
        onClose();
        router.push('/membership');
    }

    const handleForgotPasswordClicked = () => {
        onClose();
        router.push('/reset-password-request');
    }
    useEffect(() => {
        if(authresult){
            const fetchUserSubscription = async () => {
                const result = await GET("/proxy/User/subscription");
                if(!result.isSubscribed) router.push('/signup/manual');
            }
            fetchUserSubscription();
            onClose();
        }
    }, [authresult]);

    return (

        <MMNPanel className="">
            <MMNTitle title="Already member?" color="purple" />
            <div onClick={signinGoogle}>
                <GoogleButton title="Log in with Google" className="max-w-full" />
            </div>
            <div className="font-bold line-height-mmn-large text-center">
                OR
            </div>

            <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[5px]">
                    <div className="line-height-mmn-large">Member id/Email id</div>
                    <input type="text"
                           className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                           placeholder="Enter member ID/Email id"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-[5px]">
                    <div className="line-height-mmn-large">Password</div>
                    <input type="password"
                           className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                           placeholder="Enter password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <a href="#" className="text-end" onClick={handleForgotPasswordClicked}>Forgot password?</a>
                <div className="flex justify-between py-[10px]">
                    <div onClick={() => handleMembership()}>
                        <MMNButton title="Become a member"  className="border border-color-mmn-purple" color="white" size="normal"/>
                    </div>
                    <div onClick={signinManually}>
                        <MMNButton title="Login" color="purple" size="normal"/>
                    </div>
                </div>

            </div>
        </MMNPanel>
    )
}

export default LoginCard;