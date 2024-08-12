
import React from "react";
import { FamilyAccountInfo, Genders, Relationships } from "@/constants/types";
import MMNButton from "@/components/MMNButton";
import Select, { GroupBase, StylesConfig } from "react-select";
import { Option } from "react-dropdown";
import { formatDate } from "@/utils/funcs";
import { ErrorMessage } from "@/components/ErrorMessage";

interface Props {
  account?: FamilyAccountInfo;
  isSubmitBtnLoading: boolean;
  onAddFamilyMemberHandler: () => void;
  onChangeHandler: (value: string | undefined, fieldName: string) => void;
  errorState?: FamilyAccountInfo | null;
}

const AddFamilyMemberForm = ({
  account,
  isSubmitBtnLoading,
  onChangeHandler,
  errorState,
  onAddFamilyMemberHandler,
}: Props) => {
  const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
    control: (provided) => ({
      ...provided,
      padding: "8px 0px"
    })
  };
  return (
    <>
      <div className="flex flex-col gap-[10px] ">
        <div className="font-bold line-height-mmn-large">
          <span>
            {" "}
            {`${account?.firstName || ""} ${account?.lastName || ""}`}{" "}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] line-height-mmn-large">
          <div>
            <div className="pb-[5px]">First name*</div>
            <input
              type="text"
              className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
              placeholder="Enter First Name"
              value={account?.firstName}
              onChange={(e) => onChangeHandler(e.target.value, "firstName")}
            />
            {errorState?.firstName && (
              <ErrorMessage msg={`${errorState.firstName}`} />
            )}
          </div>
          <div>
            <div className="pb-[5px]">Last name*</div>
            <input
              type="text"
              className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
              placeholder="Enter Last Name"
              value={account?.lastName}
              onChange={(e) => onChangeHandler(e.target.value, "lastName")}
            />
            {errorState?.lastName && (
              <ErrorMessage msg={`${errorState.lastName}`} />
            )}
          </div>

          <div>
            <div className="pb-[5px]">Birth*</div>
            <input
              type="date"
              className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
              placeholder="Enter Birth"
              value={formatDate(account?.dateOfBirth)}
              onChange={(e) => onChangeHandler(e.target.value, "dateOfBirth")}
            />
            {errorState?.dateOfBirth && (
              <ErrorMessage msg={`${errorState?.dateOfBirth}`} />
            )}
          </div>

          <div>
            <div className="pb-[5px]">Email*</div>
            <input
              type="text"
              className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
              placeholder="email@email.no"
              value={account?.email}
              onChange={(e) => onChangeHandler(e.target.value, "email")}
            />
            {errorState?.email && <ErrorMessage msg={`${errorState?.email}`} />}
          </div>

          <div>
            <div className="pb-[5px]">Gender*</div>
            <Select
              options={Genders}
              value={Genders.find((item) => item.value === account?.gender)}
              onChange={(e) => onChangeHandler(e?.value, "gender")}
              isSearchable={false}
              styles={customStyles}
            />
            {errorState?.gender && <ErrorMessage msg={`Select gender`} />}
          </div>
          <div>
            <div className="pb-[5px]">Relationship*</div>
            <>
              <Select
                options={Relationships}
                value={Relationships.find(
                  (item) => item.value === account?.relation
                )}
                onChange={(e) => onChangeHandler(e?.value, "relation")}
                isSearchable={false}
                styles={customStyles}
              />
              {errorState?.relation && <ErrorMessage msg={`Select relation`} />}
            </>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <div onClick={() => onAddFamilyMemberHandler()}>
            <MMNButton
              title={isSubmitBtnLoading ? "Loading" : "Save Now"}
              color="white"
              disabled={isSubmitBtnLoading}
              className={"border border-color-mmn-purple"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFamilyMemberForm;
