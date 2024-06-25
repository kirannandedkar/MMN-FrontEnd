"use client"
import React, { useEffect, useState, ChangeEvent } from 'react';
import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/navigation";
import MMNButton from "@/components/MMNButton";
import { camelCaseToSentenceCase } from "@/utils/form";
import {ErrorMessage} from "@/app/signup/ErrorMessage";
import {toast} from "react-toastify";
import {POST} from "@/utils/fetch-factory";
import {SignOut} from "@/redux/user/auth.action";
import {AppDispatch} from "@/redux/store";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Auth", link: "#" },
    { title: "change-password", link: "#" },
];

interface IChangePasswordRequest {
    [key: string]: any;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

const ChangePasswordPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { authresult } = useSelector((state: any) => state.auth);
    const [errorState, setErrorState] = useState<IChangePasswordRequest | null>(null);
    const [isFormValid, setFormIsValid] = useState(false);
    const [formData, setFormData] = useState<IChangePasswordRequest | null>(null);

    useEffect(() => {
        if (!authresult) {
            router.push('/home');
        }
    }, [authresult, router]);

    const submitHandler = async () => {
        if (!isFormValid) {
            toast.warning('Form is not valid!');
            return;
        }

        const result = await POST('/proxy/user/change-password', {
            newPassword: formData?.newPassword,
            currentPassword: formData?.currentPassword,
        });

        console.log(result)
        if(result.isSuccess){
            toast.success('Successfully changed password! Please login again.');
            dispatch(SignOut())
            router.push('/home');
        }else{
            toast.warning(result.Message);
        }

    }
    const onInputChangeHandler = (value: string | undefined | null, fieldName: string) => {
        let updatedFormData = { ...formData };
        updatedFormData[fieldName] = value;

        let updatedErrorState = validate( { ...errorState }, value, fieldName, updatedFormData);
        setFormData(updatedFormData);
        setErrorState(updatedErrorState);

    };

    const validate = (formState: IChangePasswordRequest | null, value: string | undefined | null, fieldName: string, formData: IChangePasswordRequest | null) => {
        const updated = { ...formState };
        if (value == null || value === '') {
            updated[fieldName] = `${camelCaseToSentenceCase(fieldName)} field is required`;
        } else {
            updated[fieldName] = null;
        }

        if (fieldName === 'newPassword' || fieldName === 'confirmPassword') {
            if(formData?.newPassword && formData?.confirmPassword && formData?.newPassword !== formData?.confirmPassword)
                updated.confirmPassword = "New password and confirmed password not matched";
        }
        setFormIsValid(checkFormValid(updated));
        return updated;
    };

    const checkFormValid = (formState: IChangePasswordRequest | null) => {
        let isFormValid = true;
        for (let key in formState) {
            isFormValid = isFormValid && formState[key] !== '';
        }
        return isFormValid;
    };

    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData} />
            <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
                <div className="flex flex-col gap-[10px]">

                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-[10px] line-height-mmn-large">
                        <div>
                            <div className="pb-[5px]">Current Password</div>
                            <input type="password"
                                   className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                   style={{ width: '30rem' }}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChangeHandler(e.target.value, 'currentPassword')}
                            />
                            {errorState?.currentPassword && <ErrorMessage msg={`${errorState.currentPassword}`} />}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-[10px] line-height-mmn-large">
                        <div>
                            <div className="pb-[5px]">New Password</div>
                            <input type="password"
                                   className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                   style={{ width: '30rem' }}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChangeHandler(e.target.value, 'newPassword')}
                            />
                            {errorState?.newPassword && <ErrorMessage msg={`${errorState.newPassword}`} />}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-[10px] line-height-mmn-large">
                        <div>
                            <div className="pb-[5px]">Confirm Password</div>
                            <input type="password"
                                   className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                   style={{ width: '30rem' }}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChangeHandler(e.target.value, 'confirmPassword')}
                            />
                            {errorState?.confirmPassword && <ErrorMessage msg={`${errorState.confirmPassword}`} />}
                        </div>
                    </div>
                    <div className="flex" onClick={submitHandler}>
                        <MMNButton title={"Change Password"} color="white"
                                   className="border border-color-mmn-purple" />
                    </div>
                </div>
            </MMNContainer>
        </div>
    );
};

export default ChangePasswordPage;
