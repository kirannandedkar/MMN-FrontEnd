import React from "react";
import { formatDate } from "@/utils/funcs";
import Select, { GroupBase, StylesConfig } from "react-select";
import { FamilyAccountInfo, Genders, Relationships } from "@/constants/types";
import { Option } from "react-dropdown";

interface IProps {
  account: FamilyAccountInfo;
  removeMember: (id: string) => void;
  editMember: (id: string) => void;
}

const FamilyInfo: React.FC<IProps> = ({ account, removeMember, editMember }) => {
  const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
    control: (provided) => ({
      ...provided,
      padding: "8px 0px",
      backgroundColor: "#f0f0f0",
      cursor: "not-allowed",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-800">
            {`${account.firstName} ${account.lastName}`}
          </div>

          <span
            className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${
              account.isPaid ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {account.isPaid ? "Paid" : "Unpaid"}
          </span>
        </div>

        <div>
        <button
          onClick={() => editMember(account.id)}
          className="px-4 py-2 me-2 text-sm font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => removeMember(account.id)}
          className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Remove
        </button>
        </div>
       
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
        <div>
          <div className="pb-[5px]">First name</div>
          <input
            type="text"
            className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] w-full"
            value={account.firstName}
            disabled={true}
          />
        </div>
        <div>
          <div className="pb-[5px]">Last name</div>
          <input
            type="text"
            className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] w-full"
            value={account.lastName}
            disabled={true}
          />
        </div>

        <div>
          <div className="pb-[5px]">Birth</div>
          <input
            type="date"
            className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] w-full"
            value={formatDate(account.dateOfBirth)}
            disabled={true}
          />
        </div>

        <div>
          <div className="pb-[5px]">Email</div>
          <input
            type="text"
            className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] w-full"
            value={account.email}
            disabled={true}
          />
        </div>

        <div>
          <div className="pb-[5px]">Gender</div>
          <Select
            options={Genders}
            value={Genders.find((item) => item.value === account.gender)}
            isSearchable={false}
            styles={customStyles}
            isDisabled={true}
          />
        </div>
        <div>
          <div className="pb-[5px]">Relationship</div>
          <Select
            options={Relationships}
            value={Relationships.find(
              (item) => item.value === account.relation
            )}
            isSearchable={false}
            styles={customStyles}
            isDisabled={true}
          />
        </div>
      </div>
      <hr className="mb-0 mt-6"/>
    </div>
  );
};

export default FamilyInfo;
