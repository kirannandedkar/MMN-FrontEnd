"use client"
import React, { useEffect, useState, ChangeEvent } from 'react';
import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/navigation";
import MMNButton from "@/components/MMNButton";
import {camelCaseToSentenceCase, validatedForm} from "@/utils/form";
import {ErrorMessage} from "@/app/signup/ErrorMessage";
import {toast} from "react-toastify";
import {POST} from "@/utils/fetch-factory";
import {SignOut} from "@/redux/user/auth.action";
import {AppDispatch} from "@/redux/store";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Reset password request", link: "#" },
];

interface IChangePasswordRequest {
    [key: string]: any;
    email?: string;
}

const ChangePasswordPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [errorState, setErrorState] = useState<IChangePasswordRequest>({});
    const [isButtonClicked, submitBtnClicked] = useState(false);
    const [formData, setFormData] = useState<IChangePasswordRequest>({
        email: '',
    });


    const submitHandler = async () => {

        const validated = validatedForm(errorState, formData)
        if (!validated.isValid) {
            setErrorState(validated.updatedErrorState);
            toast.warning('Form is not valid!');
            return;
        }

        submitBtnClicked(true);

        const result = await POST('/proxy/userAccount/password-reset-request', {
            email: formData?.email
        });
        console.log(result);
        if(result.isSuccess){
            toast.success(result.message);
            router.push('/home');
        }else{
            toast.warning(result.message);
            submitBtnClicked(false);
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
        return updated;
    };


    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData} />
            <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
                <div className="flex flex-col gap-[10px]">

                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-[10px] line-height-mmn-large">
                        <div>
                            <div className="pb-[5px]">Email</div>
                            <input type="email"
                                   className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                   style={{ width: '30rem' }}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChangeHandler(e.target.value, 'email')}
                            />
                            {errorState?.email && <ErrorMessage msg={`${errorState.email}`} />}
                        </div>
                    </div>
                   
                    <div className="flex py-[10px]" onClick={isButtonClicked ? () => {} : submitHandler}>
                        <MMNButton title={isButtonClicked ? "Loading" : "Sent password reset link"} disabled={isButtonClicked} color="white"
                                   className="border border-color-mmn-purple" />
                    </div>
                </div>
            </MMNContainer>
        </div>
    );
};

export default ChangePasswordPage;
