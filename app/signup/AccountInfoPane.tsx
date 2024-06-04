import { useCallback, useEffect, useState } from "react"
import DropDown from 'react-dropdown';
import { AccountInfo, Genders, CountryList } from "@/constants/types";
import _ from "lodash"
import { PhoneCode } from "@/constants";

interface Props {
    disabled?: boolean,
    setMember: (member: AccountInfo | null) => void
}

export default function AccountInfoPane({ disabled = false, setMember: setParentMember }: Props) {
    const [member, setMember] = useState<AccountInfo | null>(null);

    const handleOnChange = (key: keyof AccountInfo, value: any) => {
        const newMember = { ...member, [key]: value || '' } as AccountInfo
        setMember(newMember)
        setParentMember(newMember);
    }

    return (
        <div className="flex flex-col gap-[10px] line-height-mmn-large">
            <div className="font-bold">{"Primary member information"}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[26px] ">
                <div>
                    <div className="pb-[5px]">First name*</div>
                    <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                        placeholder="Enter First Name"
                        value={member?.firstName || ''}
                        onChange={e => handleOnChange("firstName", e.target.value)}
                        disabled={disabled}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Last name*</div>
                    <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                        placeholder="Enter Last Name"
                        value={member?.lastName || ''}
                        onChange={e => handleOnChange("lastName", e.target.value)}
                        disabled={disabled}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Date of Birth*</div>
                    <input type="date" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium flex-grow w-full"
                        placeholder="Enter Birth"
                        value={member?.birth || ''}
                        onChange={e => handleOnChange("birth", e.target.value)}
                        disabled={disabled}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Email id*</div>
                    <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                        placeholder="email@email.no"
                        value={member?.email || ''}
                        onChange={e => handleOnChange("email", e.target.value)}
                        disabled={disabled}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Mobile no (Norway only)*</div>
                    <div className="relative">
                        <div className="absolute flex items-center justify-center h-full pl-[14px]">
                            <span className=" text-gray-400">{PhoneCode}</span>
                        </div>
                        <input type="text" step="any" className="py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium flex-grow focus:border-0 focus-visible:border-0 pl-[44px] pr-[14px] w-full"
                            value={member?.phoneNumber || ''}
                            onChange={e => handleOnChange("phoneNumber", e.target.value)}
                            disabled={disabled}
                        />
                    </div>
                </div>

                <div>
                    <div className="pb-[5px]">Kommune*</div>
                    <DropDown options={CountryList}
                        controlClassName="!rounded-[6px] !pl-[14px] !py-[16px] !line-height-mmn-medium"
                        arrowClassName={"!right-[27px] !top-[27px]"}
                        value={member?.muncipality || ""}
                        onChange={(e) => { handleOnChange("muncipality", e.value) }}
                        disabled={disabled}
                        placeholder={"Select Kommune"} />
                </div>

                <div>
                    <div className="pb-[5px]">Gender*</div>
                    <DropDown options={Genders}
                        controlClassName="!rounded-[6px] !pl-[14px] !py-[16px] !line-height-mmn-medium"
                        arrowClassName={"!right-[27px] !top-[27px]"}
                        value={member?.gender || ""}
                        onChange={(e) => { handleOnChange("gender", e.value) }}
                        disabled={disabled}
                        placeholder={"Select your Gender"} />
                </div>
            </div>
        </div>

    )
}