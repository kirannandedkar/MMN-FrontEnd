"use client";

import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import MMNButton from "@/components/MMNButton";

import BlogPane from "@/app/membership/BlogPane";
import PaymentCard from "../PaymentCard";
import AccountInfoPane from '../AccountInfoPane';
import { AccountInfo } from "@/constants/types";

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { handleSignupByGoogle } from "@/utils/auth";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Membership", link: "#" },
];

export default function SignUpGooglePage() {
    const { data: session } = useSession();
    const [member, setMember] = useState<AccountInfo | null>(null);

    useEffect(() => {
        if (!session?.user) return

        const descriptor = Object.getOwnPropertyDescriptor(session, 'id_token');
        const id_token = descriptor?.value || "";
        setMember({
            firstName: session.user.name?.split(' ')[0] || '',
            lastName: session.user.name?.split(' ')[1] || '',
            email: session.user.email || '',
            id_token: id_token,
        })
    }, [session]);

    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData} />
            <MMNContainer className="gap-[40px] pb-[40px] flex-col lg:flex-row">
                <div className="flex flex-col gap-[20px] grow-[2]">
                    <BlogPane />
                    <AccountInfoPane account={member} setMember={setMember} />
                    
                    <div onClick={() => handleSignupByGoogle(member)} className="flex justify-end">
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