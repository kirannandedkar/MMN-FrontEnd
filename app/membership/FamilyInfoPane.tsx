"use client"

import { useCallback, useEffect, useState } from "react"

import DropDown from 'react-dropdown';
import { FamilyAccountInfo, Genders, Relationships } from "@/constants/types";
import _ from "lodash";

interface Props {
    setMember: (member: FamilyAccountInfo | null) => void
}

export default function FamilyInfoPane(props: Props) {
    const [member, setMember] = useState<FamilyAccountInfo | null>(null);

    const handleOnChange = (key: keyof FamilyAccountInfo, value: any) => {
        const _value: any = member ? {...member} : {}
        _value[key] = value
        setMember(_value);
        props.setMember(_value);
    }

    return (
        <div className="flex flex-col gap-[10px] ">
            <div className="font-bold line-height-mmn-large">{member?.firstName || ""}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[26px] line-height-mmn-large">
                <div>
                    <div className="pb-[5px]">First name*</div>
                    <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                        placeholder="Enter First Name"
                        value={member?.firstName || ''}
                        onChange={e => handleOnChange("firstName", e.target.value)}
                    />
                </div>
                <div>
                    <div className="pb-[5px]">Last name*</div>
                    <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                        placeholder="Enter Last Name"
                        value={member?.lastName || ''}
                        onChange={e => handleOnChange("lastName", e.target.value)}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Birth*</div>
                    <input type="date" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                        placeholder="Enter Birth"
                        value={member?.birth || ''}
                        onChange={e => handleOnChange("birth", e.target.value)}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Email id*</div>
                    <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                        placeholder="email@email.no"
                        value={member?.email || ''}
                        onChange={e => handleOnChange("email", e.target.value)}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Gender*</div>
                    <DropDown options={Genders}
                        controlClassName="!rounded-[6px] !pl-[14px] !py-[16px] !line-height-mmn-medium"
                        arrowClassName={"!right-[27px] !top-[27px]"}
                        onChange={(e) => { handleOnChange("gender", e.value) }}
                        value={member?.gender || ""}
                        placeholder={"Select your Gender"} />
                </div>
                <div>
                    <div className="pb-[5px]">Relationship*</div>
                    <DropDown options={Relationships}
                        controlClassName="!rounded-[6px] !pl-[14px] !py-[16px] !line-height-mmn-medium"
                        arrowClassName={"!right-[27px] !top-[27px]"}
                        onChange={(e) => { handleOnChange("relation", e.value) }}
                        value={member?.relation || ""}
                        placeholder={"Select Relation"} />
                </div>
            </div>
        </div>

    )
}