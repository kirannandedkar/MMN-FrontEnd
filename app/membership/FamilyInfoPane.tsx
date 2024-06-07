"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"

import DropDown from 'react-dropdown';
import { FamilyAccountInfo, Genders, Relationships } from "@/constants/types";
import _ from "lodash";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "../signup/ErrorMessage";
import MMNButton from "@/components/MMNButton";
import TrashButton from "@/components/icons/trash";
import Select from 'react-select'

type IData = Pick<FamilyAccountInfo, "firstName" | "lastName" | "email" | "gender" | "birth" | "relation">
const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    birth: yup.string().required(),
    relation: yup.string().required(),
}).required();

interface Props {
    account?: FamilyAccountInfo | null,
    showAddButton?: boolean,
    disabled?: boolean,
    onSubmit: (member: FamilyAccountInfo | null) => void,
    onRemove?: () => void
}

const FamilyInfoPane = forwardRef(({ showAddButton = false, onSubmit, account = null, disabled = false, onRemove }: Props, ref) => {
    const submitButtonRef = useRef<HTMLButtonElement>(null)
    const { register, handleSubmit, control, formState, reset } = useForm<IData>({
        resolver: yupResolver<IData>(schema)
    });

    useEffect(() => {
        reset({
            firstName: account?.firstName || '',
            lastName: account?.lastName || '',
            email: account?.email || '',
            gender: account?.gender || '',
            birth: account?.birth || '',
            relation: account?.relation || '',
        });
    }, [account]);
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
        <>
            <div className="flex flex-col gap-[10px] ">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="font-bold line-height-mmn-large">
                        <span> {`${account?.firstName || ''} ${account?.lastName || ''}`} </span>
                        {/* <span className="text-[12px] text-red-600"> {(account?.birth && isOlder18(account?.birth)) ? '' : ' (younger than 18)'} </span> */}
                    </div>
                    <button ref={submitButtonRef} className="hidden" type="submit" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] line-height-mmn-large">
                        <div>
                            <div className="pb-[5px]">First name*</div>
                            <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                placeholder="Enter First Name"
                                {...register('firstName')}
                                disabled={disabled}
                            />
                            {
                                formState.errors.firstName && <ErrorMessage msg={`Input First Name`} />
                            }
                        </div>
                        <div>
                            <div className="pb-[5px]">Last name*</div>
                            <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                placeholder="Enter Last Name"
                                {...register('lastName')}
                                disabled={disabled}
                            />
                            {
                                formState.errors.lastName && <ErrorMessage msg={`Input Last Name`} />
                            }
                        </div>

                        <div>
                            <div className="pb-[5px]">Birth*</div>
                            <input type="date" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                placeholder="Enter Birth"
                                {...register('birth')}
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
                                {...register('email')}
                                disabled={disabled}
                            />
                            {
                                formState.errors.email && <ErrorMessage msg={`Input valid email`} />
                            }
                        </div>

                        <div>
                            <div className="pb-[5px]">Gender*</div>
                            <Controller name="gender" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => (
                                <>
                                    <Select
                                        options={Genders}
                                        value={Genders.find((item) => item.value === value)}
                                        onChange={(e) => onChange(e?.value)}
                                        styles={customStyles}
                                        isSearchable={false} // Disable searching
                                    />
                                    {
                                        formState.errors.gender && <ErrorMessage msg={`Select gender`} />
                                    }
                                </>
                            )} />
                        </div>
                        <div>
                            <div className="pb-[5px]">Relationship*</div>
                            <Controller name="relation" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => (
                                <>
                                    <Select
                                        options={Relationships}
                                        value={Relationships.find((item) => item.value === value)}
                                        onChange={(e) => onChange(e?.value)}
                                        styles={customStyles}
                                        isSearchable={false} // Disable searching
                                    />
                                    {
                                        formState.errors.relation && <ErrorMessage msg={`Select relation`} />
                                    }
                                </>
                            )} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-between">
                {
                    showAddButton ?
                        <div className="flex">
                            <div onClick={handleSubmit(submit)}>
                                <MMNButton title={"+ Add family member"} color="white" className={"border border-color-mmn-purple"} />
                            </div>
                        </div> : <div></div>
                }

                {
                    onRemove && (
                        <div onClick={onRemove} className="flex gap-[10x] rounded-[5px] bg-red-500 items-center px-[20px] py-[10px] text-white cursor-pointer">
                            <TrashButton fill="white" />
                            <span>{'Remove'}</span>
                        </div>
                    )
                }
            </div>
        </>
    )
});

FamilyInfoPane.displayName = "FamilyInfoPane"
export default FamilyInfoPane;