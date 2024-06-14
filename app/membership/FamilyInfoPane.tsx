"use client"

import React from "react"

import { FamilyAccountInfo, Genders, Relationships } from "@/constants/types";

import { ErrorMessage } from "../signup/ErrorMessage";
import MMNButton from "@/components/MMNButton";
import TrashButton from "@/components/icons/trash";
import Select, {GroupBase, StylesConfig} from 'react-select'
import {Option} from "react-dropdown";
import {formatDate} from "@/utils/funcs";

interface Props {
    account?: FamilyAccountInfo | null,
    showAddButton?: boolean,
    familyMemberAlreadyAdded: boolean
    disabled?: boolean,
    onAddFamilyMemberHandler: () => void,
    onRemove?: () => void,
    onChangeHandler: (value: string | null, fieldName: string) => void
    errorState?: FamilyAccountInfo | null
}

const FamilyInfoPane = ({ showAddButton = false, account = null, disabled = false, familyMemberAlreadyAdded, onRemove, onChangeHandler, errorState, onAddFamilyMemberHandler }: Props) => {
    const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
        control: (provided) => ({
            ...provided,
            padding: '8px 0px',
            backgroundColor: disabled ? '#f0f0f0' : 'white',
            cursor: disabled ? 'not-allowed' : 'default'
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            display: disabled ? 'none' : 'block'
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: disabled ? 'none' : 'block'
        })
    };
    return (
        <>
            <div className="flex flex-col gap-[10px] ">
                <div className="font-bold line-height-mmn-large">
                    <span> {`${account?.firstName || ''} ${account?.lastName || ''}`} </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] line-height-mmn-large">
                    <div>
                        <div className="pb-[5px]">First name*</div>
                        <input type="text"
                               className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                               placeholder="Enter First Name"
                               value={account?.firstName}
                               onChange={(e) => onChangeHandler(e.target.value, 'firstName')}
                               disabled={disabled}
                        />
                        {
                            errorState?.firstName && <ErrorMessage msg={`${errorState.firstName}`}/>
                        }
                    </div>
                    <div>
                        <div className="pb-[5px]">Last name*</div>
                        <input type="text"
                               className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                               placeholder="Enter Last Name"
                               value={account?.lastName}
                               onChange={(e) => onChangeHandler(e.target.value, 'lastName')}
                               disabled={disabled}
                        />
                        {
                            errorState?.lastName && <ErrorMessage msg={`${errorState.lastName}`}/>
                        }
                    </div>

                    <div>
                        <div className="pb-[5px]">Birth*</div>
                        <input type="date"
                               className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                               placeholder="Enter Birth"
                               value={formatDate(account?.dateOfBirth)}
                               onChange={(e) => onChangeHandler(e.target.value, 'dateOfBirth')}
                               disabled={disabled}
                        />
                        {
                            errorState?.dateOfBirth &&
                            <ErrorMessage msg={`${errorState?.dateOfBirth}`}/>
                        }
                    </div>

                    <div>
                        <div className="pb-[5px]">Email*</div>
                        <input type="text"
                               className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                               placeholder="email@email.no"
                               value={account?.email}
                               onChange={(e) => onChangeHandler(e.target.value, 'email')}
                               disabled={disabled}
                        />
                        {
                            errorState?.email && <ErrorMessage msg={`${errorState?.email}`}/>
                        }
                    </div>

                    <div>
                        <div className="pb-[5px]">Gender*</div>
                        <Select
                            options={Genders}
                            value={Genders.find((item) => item.value === account?.gender)}
                            onChange={(e) => onChangeHandler(e?.value, 'gender')}
                            isSearchable={false} // Disable searching
                            styles={customStyles}
                            isDisabled={disabled}
                        />
                        {
                            errorState?.gender && <ErrorMessage msg={`Select gender`}/>
                        }
                    </div>
                    <div>
                        <div className="pb-[5px]">Relationship*</div>
                        <>
                            <Select
                                options={Relationships}
                                value={Relationships.find((item) => item.value === account?.relation)}
                                onChange={(e) => onChangeHandler(e?.value, 'relation')}
                                isSearchable={false} // Disable searching
                                styles={customStyles}
                                isDisabled={disabled}
                            />
                            {
                                errorState?.relation && <ErrorMessage msg={`Select relation`}/>
                            }
                        </>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                {
                    showAddButton && !familyMemberAlreadyAdded ?
                        <div className="flex">
                            <div onClick={() => onAddFamilyMemberHandler()} >
                                <MMNButton title={"+ Add family member"} color="white"
                                           className={"border border-color-mmn-purple"}/>
                            </div>
                        </div> : <div></div>
                }

                {
                    onRemove && !familyMemberAlreadyAdded && (
                        <div onClick={onRemove}
                             className="flex gap-[10x] rounded-[5px] bg-red-500 items-center px-[20px] py-[10px] text-white cursor-pointer">
                            <TrashButton fill="white"/>
                            <span>{'Remove'}</span>
                        </div>
                    )
                }
            </div>
        </>
    )
};

FamilyInfoPane.displayName = "FamilyInfoPane"
export default FamilyInfoPane;