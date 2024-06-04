"use client";

import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import BlogPane from "@/app/membership/BlogPane";
import PaymentCard from "./PaymentCard";
import AccountInfoPane from './AccountInfoPane';
import { AccountInfo, FamilyAccountInfo } from "@/constants/types";

import MMNButton from "@/components/MMNButton";
import { useEffect, useState } from "react";
import FamilyInfoPane from "@/app/membership/FamilyInfoPane";
import TrashButton from "@/components/icons/trash";
import { useSession } from "next-auth/react";
import { handleSignupByGoogle, handleSignupManually } from "@/utils/auth";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Membership", link: "#" },
];

export default function SignUpPage({ byGoogle }: { byGoogle: boolean }) {
    const [signed, setSigned] = useState(false);

    const [member, setMember] = useState<AccountInfo | null>(null);
    const [familyAccounts, setFamilyAccounts] = useState<(FamilyAccountInfo | null)[]>([]);

    if (byGoogle) {
        const { data: session } = useSession();
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
    }

    const AddClicked = () => {
        if (familyAccounts.includes(null))
            return;
        setFamilyAccounts((prev) => ([...prev, null]));
    }

    const RemoveClick = (index: number) => {
        setFamilyAccounts(prev => {
            prev.splice(index, 1);
            return [...prev];
        });
    }

    const onFamilyInfoChange = (member: FamilyAccountInfo | null, index: number) => {
        if (!member)
            return;

        let newList = [...familyAccounts];
        newList.splice(index, 1);
        newList.push(member);

        setFamilyAccounts(newList);
    }

    // add two password properteis
    const [password, setPassword] = useState<{
        password: string,
        rePassword: string
    }>({
        password: '',
        rePassword: ''
    });

    const signup = async () => {
        if (byGoogle) {
            await handleSignupByGoogle(member, familyAccounts)
        } else {
            const result = await handleSignupManually(member, password.password, familyAccounts);
            setSigned(result);
        }
    }

    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData} />
            <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
                <div className="flex flex-col gap-[20px] grow-[2]">
                    <BlogPane member={member} signed={signed} />
                    <AccountInfoPane setMember={setMember} disabled={signed} />
                    {
                        !signed && (
                            <>
                                {
                                    !byGoogle &&
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
                                }

                                <div onClick={signup} className="flex justify-end">
                                    <MMNButton title={"Complete Profile"} color="white" className={"border border-color-mmn-purple"} />
                                </div>
                            </>
                        )
                    }
                    {
                        signed && <div className="line-height-mmn-large font-bold">Add family members</div>
                    }

                    {
                        familyAccounts.map((account, index) => {
                            return (
                                <>
                                    <FamilyInfoPane setMember={(member) => onFamilyInfoChange(member, index)} key={index} />
                                    <div className="flex justify-end">
                                        <div onClick={() => RemoveClick(index)} className="flex gap-[10x] rounded-[5px] bg-red-500 items-center px-[20px] py-[10px] text-white cursor-pointer">
                                            <TrashButton fill="white" />
                                            <span>{'Remove'}</span>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                    {
                        signed && (
                            <div className="flex">
                                <div onClick={AddClicked}>
                                    <MMNButton title={"+ Add family member"} color="white" className={"border border-color-mmn-purple"} />
                                </div>
                            </div>
                        )
                    }
                </div>
                <PaymentCard memberCount={familyAccounts.length + 1} />
            </MMNContainer >
        </div >
    );
}