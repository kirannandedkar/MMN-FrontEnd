"use client";

import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import BlogPane from "@/app/membership/BlogPane";
import PaymentCard from "../PaymentCard";
import AccountInfoPane from '../AccountInfoPane';
import { AccountInfo } from "@/constants/types";

import { useRouter } from "next/navigation";
import MMNButton from "@/components/MMNButton";
import { useState } from "react";
import { handleSignup } from "@/utils/auth";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Membership", link: "#" },
];

export default function SignUpManualPage() {
    const router = useRouter();

    const [member, setMember] = useState<AccountInfo | null>(null);
    // add two password properteis
    const [password, setPassword] = useState<{
        password: string,
        rePassword: string
    }>({
        password: '',
        rePassword: ''
    });

    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData} />
            <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
                <div className="flex flex-col gap-[20px] grow-[2]">
                    <BlogPane />
                    <AccountInfoPane account={member} setMember={setMember} />

                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-[26px]">
                        <div>
                            <div className="pb-[5px]">Type password*</div>
                            <input type="password" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                placeholder="Enter Password" value={password.password} onChange={e => setPassword({ ...password, password: e.target.value })}
                            />
                        </div>

                        <div>
                            <div className="pb-[5px]">Re-Type password*</div>
                            <input type="password" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                placeholder="Re-Enter Password" value={password.rePassword} onChange={e => setPassword({ ...password, rePassword: e.target.value })}
                            />
                        </div>
                    </div>
                    
                    <div onClick={() => handleSignup(member, password)} className="flex justify-end">
                        <MMNButton title={"Complete Profile"} color="white" className={"border border-color-mmn-purple"} />
                    </div>

                    <div className="line-height-mmn-large font-bold">Add family members</div>
                    <div>
                        <MMNButton title={"+ Add family member"} color="white" className={"border border-color-mmn-purple"} />
                    </div>

                </div>
                <PaymentCard />
            </MMNContainer>
        </div>
    );
}