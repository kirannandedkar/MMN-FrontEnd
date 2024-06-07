'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import DropDown from 'react-dropdown';
import { AccountInfo, Genders, CountryList } from "@/constants/types";
import _ from "lodash"
import { PhoneCode } from "@/constants";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "./ErrorMessage";
import Select from 'react-select'
interface Props {
    account?: AccountInfo | null,
    disabled?: boolean,
    byGoogle?: boolean,
    onSubmit: (data: IData) => void
}

type IData = Pick<AccountInfo, "firstName" | "lastName" | "email" | "gender" | "birth" | "muncipality" | "mobile">
const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    birth: yup.string().required(),
    muncipality: yup.string().required(),
    mobile: yup.number().required(),
}).required();

const AccountInfoPane = forwardRef(({ account = null, disabled = false, byGoogle = false, onSubmit }: Props, ref) => {
    const submitButtonRef = useRef<HTMLButtonElement>(null)
    const { register, handleSubmit, control, watch, formState, reset } = useForm<IData>({
        resolver: yupResolver<IData>(schema)
    });
    //retrieve pre defined data - google login
    useEffect(() => {
        reset({
            firstName: account?.firstName || '',
            lastName: account?.lastName || '',
            email: account?.email || '',
            gender: account?.gender || '',
            birth: account?.birth || '',
            muncipality: account?.muncipality || '',
            mobile: account?.mobile || '',
        }); // Reset the form values when account changes
    }, [account, reset]);

    //call callback func in parent
    const submit: SubmitHandler<IData> = (data) => {
        onSubmit(data)
    }

    //extract some function
    useImperativeHandle(ref, () => {
        return {
            submit() {
                submitButtonRef.current?.click()
            }
        };
    }, []);
   
    const customStyles = {
        control: (provided: any) => ({
          ...provided,
          padding: '8px 0px'
        }),
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <button ref={submitButtonRef} className="hidden" type="submit" />
            <div className="flex flex-col gap-[10px] line-height-mmn-large">
                <div className="font-bold">{"Primary member information"}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] ">
                    <div>
                        <div className="pb-[5px]">First name*</div>
                        <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                            placeholder="Enter First Name"
                            {...register("firstName")}
                            disabled={disabled || byGoogle}
                        />
                        {
                            formState.errors.firstName && <ErrorMessage msg={`Input First Name`} />
                        }
                    </div>

                    <div>
                        <div className="pb-[5px]">Last name*</div>
                        <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                            placeholder="Enter Last Name"
                            {...register("lastName")}
                            disabled={disabled || byGoogle}
                        />
                        {
                            formState.errors.lastName && <ErrorMessage msg={`Input Last Name`} />
                        }
                    </div>

                    <div>
                        <div className="pb-[5px]">Date of Birth*</div>
                        <input type="date" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium flex-grow w-full"
                            placeholder="Enter Birth"
                            {...register("birth")}
                            disabled={disabled}
                        />
                        {
                            formState.errors.birth && <ErrorMessage msg={`Choose your birth`} />
                        }
                    </div>

                    <div>
                        <div className="pb-[5px]">Email id*</div>
                        <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                            placeholder="email@email.no"
                            {...register("email")}
                            disabled={disabled || byGoogle}
                        />
                        {
                            formState.errors.email && <ErrorMessage msg={`Input valid email`} />
                        }
                    </div>

                    <div>
                        <div className="pb-[5px]">Mobile no (Norway only)*</div>
                        <div className="relative">
                            <div className="absolute flex items-center justify-center h-full pl-[14px]">
                                <span className=" text-gray-400">{PhoneCode}</span>
                            </div>
                            <input type="text" step="any" className="py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium flex-grow focus:border-0 focus-visible:border-0 pl-[44px] pr-[14px] w-full"
                                {...register("mobile")}
                                disabled={disabled}
                            />
                        </div>
                        {
                            formState.errors.mobile && <ErrorMessage msg={`Input valid mobile number`} />
                        }
                    </div>

                    <div>
                        <div className="pb-[5px]">Kommune*</div>
                        <Controller name="muncipality" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => (
                            <>
                                <Select
                                    options={CountryList}
                                    value={CountryList.find((item) => item.value === value)}
                                    onChange={(e: any) => onChange(e?.value)}
                                    styles={customStyles}
                                    isSearchable={false} // Disable searching
                                />
                                {
                                    formState.errors.muncipality && <ErrorMessage msg={`Choose muncipality`} />
                                }
                            </>
                        )} />
                    </div>

                    <div>
                        <div className="pb-[5px]">Gender*</div>
                        <Controller name="gender" control={control} render={({ field: { value, onChange } }) => {
                            return (
                                <>
                                    <Select
                                        options={Genders}
                                        value={Genders.find((item) => item.value === value)}
                                        onChange={(e) => onChange(e?.value)}
                                        styles={customStyles}
                                        isSearchable={false} // Disable searching
                                    />
                                    {
                                        formState.errors.gender && <ErrorMessage msg={`Choose gender`} />
                                    }
                                </>
                            )
                        }
                        } />
                    </div>
                </div>
            </div>
        </form>

    )
})

AccountInfoPane.displayName = "AccountInfoPane"
export default AccountInfoPane