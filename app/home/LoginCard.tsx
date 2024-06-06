"use client"

import MMNTitle from "@/components/MMNTItle";
import MMNPanel from "@/components/MMNPanel";
import MMNButton from "@/components/MMNButton";
import GoogleButton from "@/components/GoogleButton";
import { useState } from "react";
import { useDispatch, useSelector, useStore } from 'react-redux'
import { AppDispatch } from "@/redux/store";
import { SignInGoogle, SignInManualy } from "@/redux/user/auth.action";
import { toast } from "react-toastify";

export default function LoginCard() {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signinManually = () => {
        if(!email || !password) {
            toast.info('Input Email or Password');
            return;
        }
        dispatch(SignInManualy({ email, password }));
    }

    const signinGoogle = () => {
        dispatch(SignInGoogle());
    }
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

                <div className="flex justify-end">
                    <div onClick={signinManually}>
                        <MMNButton title="Login" color="purple" size="normal" />
                    </div>
                </div>
            </div>
        </MMNPanel>
    )
}