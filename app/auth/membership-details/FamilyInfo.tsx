import React from 'react';
import {formatDate} from "@/utils/funcs";
import Select, {GroupBase, StylesConfig} from "react-select";
import {FamilyAccountInfo, Genders, Relationships} from "@/constants/types";
import {Option} from "react-dropdown";

interface IProps{
    account: FamilyAccountInfo
}

const FamilyInfo = ({account} : IProps) => {

    const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
        control: (provided) => ({
            ...provided,
            padding: '8px 0px',
            backgroundColor: '#f0f0f0',
            cursor: 'not-allowed'
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            display: 'none'
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none'
        })
    };

    return (
        <div className="flex flex-col gap-[10px] ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] line-height-mmn-large">
                <div>
                    <div className="pb-[5px]">First name</div>
                    <input type="text"
                           className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                           value={account.firstName}
                           disabled={true}
                    />
                </div>
                <div>
                    <div className="pb-[5px]">Last name</div>
                    <input type="text"
                           className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                           value={account.lastName}
                           disabled={true}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Birth</div>
                    <input type="date"
                           className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                           value={formatDate(account.dateOfBirth)}
                           disabled={true}
                    />
                </div>

                <div>
                    <div className="pb-[5px]">Email</div>
                    <input type="text"
                           className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                           value={account.email}
                           disabled={true}
                    />

                </div>

                <div>
                    <div className="pb-[5px]">Gender</div>
                    <Select
                        options={Genders}
                        value={Genders.find((item) => item.value === account?.gender)}
                        isSearchable={false} // Disable searching
                        styles={customStyles}
                        isDisabled={true}
                    />
                </div>
                <div>
                    <div className="pb-[5px]">Relationship</div>
                    <>
                        <Select
                            options={Relationships}
                            value={Relationships.find((item) => item.value === account?.relation)}
                            isSearchable={false} // Disable searching
                            styles={customStyles}
                            isDisabled={true}
                        />
                    </>
                </div>
            </div>
        </div>
    );
};

export default FamilyInfo;