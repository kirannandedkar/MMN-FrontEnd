import { useCallback, useEffect, useState } from "react"
import DropDown from 'react-dropdown';
import { AccountInfo, Genders, CountryList } from "@/constants/types";
import _ from "lodash"

interface Props {
    account: AccountInfo | null,
    setMember: (member: AccountInfo | null) => void
}

export default function AccountInfoPane(props: Props) {
    const [member, setMember] = useState<AccountInfo | null>(props.account);

    useEffect(() => {
        setMember(props.account)
    }, [props])

    const debounceFn = useCallback(_.debounce(props.setMember, 1000), []);

    const handleOnChange = (key: keyof AccountInfo, value: any) => {
        const newMember = { ...member, [key]: value || '' } as AccountInfo
        setMember(newMember)
        debounceFn(newMember);
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
                    <div className="pb-[5px]">Mobile no *</div>
                    <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                        placeholder="+123456789"
                        value={member?.mobile || ''}
                        onChange={e => handleOnChange("mobile", e.target.value)}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Kommune*</div>
                    <DropDown options={CountryList}
                        controlClassName="!rounded-[6px] !pl-[14px] !py-[16px] !line-height-mmn-medium"
                        arrowClassName={"!right-[27px] !top-[27px]"}
                        value={member?.country || ""}
                        onChange={(e) => { handleOnChange("country", e.value) }}
                        placeholder={"Select Kommune"} />
                </div>

                <div>
                    <div className="pb-[5px]">Gender*</div>
                    <DropDown options={Genders}
                        controlClassName="!rounded-[6px] !pl-[14px] !py-[16px] !line-height-mmn-medium"
                        arrowClassName={"!right-[27px] !top-[27px]"}
                        value={member?.gender || ""}
                        onChange={(e) => { handleOnChange("gender", e.value) }}
                        placeholder={"Select your Gender"} />
                </div>
            </div>
        </div>

    )
}