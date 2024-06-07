"use client";

import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import BlogPane from "@/app/membership/BlogPane";
import PaymentCard from "./PaymentCard";
import AccountInfoPane from './AccountInfoPane';
import { AccountInfo, FamilyAccountInfo } from "@/constants/types";

import MMNButton from "@/components/MMNButton";
import { useEffect, useRef, useState } from "react";
import FamilyInfoPane from "@/app/membership/FamilyInfoPane";
import { useSession } from "next-auth/react";
import { handleSignupByGoogle, handleSignupManually } from "@/utils/auth";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";
import { useRouter } from "next/navigation";
import { isOlder18 } from "@/utils/funcs";
import { toast } from "react-toastify";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Membership", link: "#" },
];

const schema = yup.object({
    password: yup.string().required(),
    repassword: yup.string().required(),
});

type CredentialData = {
    password: string,
    repassword: string
}

export default function SignUpPage({ byGoogle }: { byGoogle: boolean }) {
    const { register, handleSubmit, control, watch, formState, reset } = useForm<CredentialData>({
        resolver: yupResolver<CredentialData>(schema)
    });

    const router = useRouter();

    const [signed, setSigned] = useState(false);
    const [primaryAccount, setPrimaryAccount] = useState<AccountInfo | null>(null);
    const [familyAccounts, setFamilyAccounts] = useState<(FamilyAccountInfo | null)[]>([]);
    // add two password properties
    const [password, setPassword] = useState<CredentialData>({ password: '', repassword: '' });
    const [memberCount, setMemberCount] = useState(1); //primary account

    const primaryAcocuntInfoPaneRef = useRef<any>(null);
    const submitButtonForCredentialRef = useRef<any>(null);

    if (byGoogle) {
        const { data: session } = useSession();
        useEffect(() => {
            if (!session?.user) return

            const descriptor = Object.getOwnPropertyDescriptor(session, 'id_token');
            const id_token = descriptor?.value || "";
            setPrimaryAccount({
                firstName: session.user.name?.split(' ')[0] || '',
                lastName: session.user.name?.split(' ')[1] || '',
                email: session.user.email || '',
                id_token: id_token,
                mobile: '',
                gender: '',
                birth: '',
                muncipality: '',
            })
        }, [session]);
    }

    useEffect(() => {
        let count = 1; //primary account
        familyAccounts.map(acc => {
            if (isOlder18(acc?.birth)) count++;
        });
        setMemberCount(count);
    }, [familyAccounts]);

    let account: any = null;

    const onAddEmptyFamilyAccountClicked = () => {
        setFamilyAccounts((prev) => ([...prev, null]));
    }

    const onAddCompletedFamilyAccountCallback = (_familymember: any) => {
        let newFamilyAccounts = [...familyAccounts];
        newFamilyAccounts.pop();
        newFamilyAccounts.push(_familymember);
        newFamilyAccounts.push(null);

        setFamilyAccounts(newFamilyAccounts);
    }

    const onRemoveFamilyAccountClicked = (index: number) => {
        setFamilyAccounts(prev => {
            prev.splice(index, 1);
            return [...prev];
        });
    }

    const onCompletePrimaryAccountClicked = async () => {
        if (primaryAcocuntInfoPaneRef.current) {
            primaryAcocuntInfoPaneRef.current.submit()
        }
    }

    const signUpManually: SubmitHandler<CredentialData> = async (data) => {
        if (data.password != data.repassword) 
            return;
        const flag = await handleSignupManually(account, data.password, familyAccounts);
        setSigned(flag);
        setPrimaryAccount(account);
    }

    const onPrimaryAccountCallback = async (_member: any) => {
        account = _member;
        if (byGoogle) {
            setSigned(await handleSignupByGoogle(_member, familyAccounts));
        }
        else {
            submitButtonForCredentialRef.current?.click();
        }
    }

    const processPayment = () => {
        if (!signed) {
            toast.info('You need to sign up first.');
            return;
        }

        const finalFamilyAccounts = familyAccounts.filter(acc => acc != null);
        setFamilyAccounts(finalFamilyAccounts);

        router.push('/payment/checkout');
    }
    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData} />
            <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
                <div className="flex flex-col gap-[20px] grow-[2]">
                    <BlogPane fullName={ `${primaryAccount?.firstName || ''} ${primaryAccount?.lastName || ''}` } signed={signed} />
                    <AccountInfoPane
                        ref={primaryAcocuntInfoPaneRef}
                        onSubmit={onPrimaryAccountCallback}
                        account={primaryAccount}
                        disabled={signed}
                        byGoogle={byGoogle} />
                    {
                        !signed &&
                        (
                            <>
                                <form onSubmit={handleSubmit(signUpManually)}>
                                    {
                                        !byGoogle &&
                                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-[10px]">
                                            <button ref={submitButtonForCredentialRef} className="hidden" type="submit" />
                                            <div>
                                                <div className="pb-[5px]">Type password*</div>
                                                <input type="password" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                                    placeholder="Enter Password"
                                                    {...register('password')}
                                                />
                                                {
                                                    formState.errors.password && <ErrorMessage msg={`Input password`} />
                                                }
                                            </div>

                                            <div>
                                                <div className="pb-[5px]">Re-Type password*</div>
                                                <input type="password" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                                    placeholder="Re-Enter Password"
                                                    {...register('repassword')}
                                                />
                                                {
                                                    formState.errors.repassword && <ErrorMessage msg={`Confirm password`} />
                                                }
                                                {
                                                    !formState.errors.password && !formState.errors.repassword && password.password != password.repassword && (
                                                        <ErrorMessage msg={`Password does not match`} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    }
                                </form>
                                <div onClick={onCompletePrimaryAccountClicked} className="flex justify-end">
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
                                <FamilyInfoPane
                                    onSubmit={onAddCompletedFamilyAccountCallback}
                                    key={index}
                                    showAddButton={(index === familyAccounts.length - 1)}
                                    disabled={(index !== familyAccounts.length - 1)}
                                    account={account}
                                    onRemove={() => onRemoveFamilyAccountClicked(index)}
                                />
                            )
                        })
                    }

                    {
                        signed && familyAccounts.length == 0 && (
                            <div className="flex">
                                <div onClick={onAddEmptyFamilyAccountClicked}>
                                    <MMNButton title={"+ Add family member"} color="white" className={"border border-color-mmn-purple"} />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    <div className="sticky top-[20px]">
                        <PaymentCard memberCount={memberCount} processClicked={processPayment} />
                    </div>
                </div>
            </MMNContainer >
        </div >
    );
}