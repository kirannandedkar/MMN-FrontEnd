"use client";

import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import BlogPane from "@/app/membership/BlogPane";
import PaymentCard from "./PaymentCard";
import AccountInfoPane from './AccountInfoPane';
import {AccountInfo, FamilyAccountInfo, FamilyMember} from "@/constants/types";

import MMNButton from "@/components/MMNButton";
import {useEffect, useRef, useState} from "react";
import FamilyInfoPane from "@/app/membership/FamilyInfoPane";
import {useSession} from "next-auth/react";
import {handleSignupByGoogle, handleSignupManually} from "@/utils/auth";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {ErrorMessage} from "./ErrorMessage";
import {useRouter} from "next/navigation";
import {isOlder16} from "@/utils/funcs";
import {toast} from "react-toastify";
import {GET, POST} from "@/utils/fetch-factory";
import {useSelector} from "react-redux";
import {camelCaseToSentenceCase} from "@/utils/form";
import ConfirmDialog from "@/components/ConfirmDialog";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Membership", link: "#" },
];

const schema = yup.object({
    password: yup.string().required('Password is required.')
        .min(7, 'Password must be at least 7 characters long.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one digit.')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character.'),
    repassword: yup.string().required('Password is required.')
        .min(7, 'Password must be at least 7 characters long.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one digit.')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character.'),
});

type CredentialData = {
    password: string,
    repassword: string
}

const emptyFamilyMember = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: ''
}

export default function SignUpPage({ byGoogle }: { byGoogle: boolean }) {
    const { register, handleSubmit, control, watch, formState, reset } = useForm<CredentialData>({
        resolver: yupResolver<CredentialData>(schema)
    });

    const router = useRouter();

    const [signed, setSigned] = useState(false);
    const [primaryAccount, setPrimaryAccount] = useState<AccountInfo | null>(null);
    const [familyAccounts, setFamilyAccounts] = useState<(FamilyMember)[]>([]);
    // add two password properties
    const [password, setPassword] = useState<CredentialData>({ password: '', repassword: '' });
    const [memberCount, setMemberCount] = useState(1); //primary account
    const [MembershipFee, setMembershipFee] = useState<number>(0);

    const primaryAcocuntInfoPaneRef = useRef<any>(null);
    const submitButtonForCredentialRef = useRef<any>(null);
    const { authresult } = useSelector((state: any) => state.auth);
    const [familyMemberNotAdded, setFamilyMemberNotAdded] = useState(true);
    const [notPaid, setNotPaid] = useState(false);
    const [familyMemberFormState, setFamilyMemberFormState] = useState<(FamilyMember)[]>([]);
    const [isFamilyMemberLastFormValid, setFamilyMemberLastFormValid] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                dateOfBirth: '',
                muncipality: '',
            })
        }, [session]);
    }
    useEffect(() => {
        const fetchData = async () => {
            const {price} = await GET("/proxy/subscription-plan");
            setMembershipFee(price / 100);
            if(authresult){
                setSigned(true);
                await fetchUserInfo();
                await fetchFamilyMembers();
            }
        }
        fetchData();
    }, [authresult]);

    const fetchUserInfo = async () => {
        const userInfo = await GET("/proxy/user/me");
        setPrimaryAccount({
            firstName: userInfo.firstName || '',
            lastName: userInfo.lastName || '',
            email: userInfo.email || '',
            mobile: '',
            gender: '',
            dateOfBirth: '',
            muncipality: '',
        })
    }

    const fetchFamilyMembers = async () => {
        const familyMembers = await GET("/proxy/family-members");
        if (familyMembers && familyMembers.length > 0)
        {
            setFamilyAccounts(familyMembers);
            countingFamilyMembers(familyMembers);
            await fetchUserSubscription();
            setFamilyMemberNotAdded(false);
            setFamilyMemberLastFormValid(true);
        }
        else
        {
            setFamilyMemberNotAdded(true);
        }
    }

    const fetchUserSubscription = async () => {
        const subscription = await GET("/proxy/user/subscription");
        if(!subscription.isSubscribed)
            setNotPaid(true);
        else
            router.push('/home');
    }

    const countingFamilyMembers = (familyAccounts: (FamilyAccountInfo | null)[]) => {
        let count = 1;
        familyAccounts?.forEach(acc => {
            if (isOlder16(acc?.dateOfBirth)) {
                count++;
            }
        });
        setMemberCount(count);
    };

    let account: any = null;

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

    const processPayment = async () => {
        if (!signed) {
            toast.info('You need to sign up first.');
            return;
        }

        //add family members
        if(familyMemberNotAdded){
            const result = await POST("/proxy/family-members", familyAccounts);
            if(result.isSuccess){
                await processCheckout();
            }
        }else{
            await processCheckout();
        }
    }

    const processCheckout = async () => {
        router.push('/payment/checkout');
    }

    //Family member related handler
    const onFamilyMemberChangeHandlerChangeHandler = (i: number, value: string | undefined | null, fieldName: string) => {
        const updatedAccounts = [...familyAccounts];
        const updatedAccount = {...updatedAccounts[i]}
        updatedAccount[fieldName] = value;
        updatedAccounts[i] = updatedAccount;

        //field validation
        const updatedStates = [...familyMemberFormState];
        updatedStates[i] = validate({...updatedStates[i]}, value, fieldName);

        setFamilyMemberFormState(updatedStates);
        setFamilyAccounts(updatedAccounts);

        if(fieldName == 'dateOfBirth')
            countingFamilyMembers(updatedAccounts);
    };

    const onAddEmptyFamilyAccountClicked = async (isProcessBtnClicked = false) => {
        const isValid = validatesAllField();
        if(!isValid)
        {
            toast.error("Form is not valid.");
            return;
        }

        if(familyAccounts.length == 0 && !isProcessBtnClicked){
            addNewFamilyAccount();
        }else if(familyAccounts.length > 0){
            if(isProcessBtnClicked)
            {
                setIsDialogOpen(true);
            }
            else addNewFamilyAccount();
        }else if(familyAccounts.length == 0 && isProcessBtnClicked){
            setIsDialogOpen(true); 
        }
    }

    const handleConfirm = async () => {
        setIsDialogOpen(false);
        await processPayment();
    }

    const addNewFamilyAccount = () =>{
        setFamilyAccounts((prev) => ([...prev, emptyFamilyMember]));
        setFamilyMemberLastFormValid(false);
    }

    const onRemoveFamilyAccountClicked = (index: number) => {
        setFamilyAccounts(prev => {
            prev.splice(index, 1);
            return [...prev];
        });
    }

    const validate = (formState: FamilyAccountInfo, value: string | undefined | null, fieldName: string) => {
        const updated = {...formState};
        if(value == null || value === '')
        {
            updated[fieldName] = `${camelCaseToSentenceCase(fieldName)} field is required`;
            setFamilyMemberLastFormValid(false);
        }
        else
            updated[fieldName] = null;
        return updated;
    }

    const validatesAllField = () => {
        let isValid = true;
        if(familyAccounts.length > 0){
            const states = [...familyMemberFormState];
            const state = {...states[familyAccounts.length - 1]};
            const lastFormData = {...familyAccounts[familyAccounts.length - 1]};
            for (let key in lastFormData){
                if(lastFormData[key] == null || lastFormData[key] === ''){
                    isValid = isValid && false;
                    state[key] = `${camelCaseToSentenceCase(key)} field is required`
                }
            }
            states[familyAccounts.length - 1] = state;
            setFamilyMemberFormState(states);
        }

        return isValid;
    }

    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData} />
            <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
                <div className="flex flex-col gap-[20px] grow-[2]">
                    <BlogPane
                        fullName={`${primaryAccount?.firstName || ''} ${primaryAccount?.lastName || ''}`}
                        signed={signed}
                        notPaid={notPaid}
                        familyMemberNotAdded={familyMemberNotAdded} />

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
                                                    formState.errors.password && <ErrorMessage msg={`${formState.errors.password.message}`} />
                                                }
                                            </div>

                                            <div>
                                                <div className="pb-[5px]">Re-Type password*</div>
                                                <input type="password" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                                    placeholder="Re-Enter Password"
                                                    {...register('repassword')}
                                                />
                                                {
                                                    formState.errors.repassword && <ErrorMessage msg={`${formState.errors.repassword.message}`} />
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
                                    errorState={familyMemberFormState[index]}
                                    familyMemberAlreadyAdded={!familyMemberNotAdded}
                                    key={index}
                                    account={account}
                                    onChangeHandler={(value, fieldName) => onFamilyMemberChangeHandlerChangeHandler(index, value, fieldName)}
                                    showAddButton={(index === familyAccounts.length - 1)}
                                    disabled={(index !== familyAccounts.length - 1) || !familyMemberNotAdded}
                                    onAddFamilyMemberHandler={onAddEmptyFamilyAccountClicked}
                                    onRemove={() => onRemoveFamilyAccountClicked(index)}
                                />
                            )
                        })
                    }

                    {
                        signed && familyMemberNotAdded && familyAccounts.length == 0 &&  (
                            <div className="flex">
                                <div onClick={() => onAddEmptyFamilyAccountClicked()}>
                                    <MMNButton title={"+ Add family member"} color="white" className={"border border-color-mmn-purple"} />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    <div className="sticky top-[20px]">
                        <PaymentCard memberCount={memberCount} isSignedIn={signed} processClicked={() => onAddEmptyFamilyAccountClicked(true)} MembershipFee={MembershipFee}/>
                    </div>
                </div>
            </MMNContainer>

        <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirm}
                title="Confirm Action"
                message="Are you sure you want to proceed payment?"
            />
        </div >
    );
}