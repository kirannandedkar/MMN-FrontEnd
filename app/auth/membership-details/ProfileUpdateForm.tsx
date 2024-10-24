import { ErrorMessage } from "@/components/ErrorMessage";
import MMNButton from "@/components/MMNButton";
import { PhoneCode } from "@/constants";
import { CountryList, Genders, ProfileInfo } from "@/constants/types";
import { POST } from "@/utils/fetch-factory";
import { camelCaseToSentenceCase, validatedForm } from "@/utils/form";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const initialFamilyMember = {
    id: "N/A",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    fomatedDateOfBirth: "",
    gender: "",
    muncipality: "",
    phoneNumber: ""
  };
  
interface IProps {
  userInfo: ProfileInfo | null;
  updatedSuccess: (profileInfo: ProfileInfo) => void
}

const ProfileUpdateForm = ({ userInfo, updatedSuccess }: IProps) => {

    const [familyMember, setFamilyMember] =
    useState<ProfileInfo>(userInfo!);

  const [errorState, setErrorState] =
    useState<ProfileInfo>(initialFamilyMember);

    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

    const validate = (
        formState: ProfileInfo,
        value: string | undefined | null,
        fieldName: string
      ) => {
        const updated = { ...formState };
        if (value == null || value === "")
          updated[fieldName] = `${camelCaseToSentenceCase(
            fieldName
          )} field is required`;
        else updated[fieldName] = null;
        return updated;
      };

      
  const onChangeHandler = (
    value: string | undefined | null,
    fieldName: string
  ) => {
    const updatedAccount = { ...familyMember };
    updatedAccount[fieldName] = value;

    setErrorState(validate(errorState, value, fieldName));
    setFamilyMember(updatedAccount);
  };

  const onSubmitFormHandler = async () => {
    debugger;
    const validationResult = validatedForm<ProfileInfo>(
      errorState,
      familyMember
    );
    const validateState: ProfileInfo = {
      ...validationResult.updatedErrorState,
    };

    setErrorState(validateState);
    if (validationResult.isValid) {
        setSubmitBtnLoading(true);
      const response = await POST("/proxy/user/update-profile", familyMember);
      if (response.isSuccess) {
        setSubmitBtnLoading(false);
        toast.success("Family member addedd successfully!");
        updatedSuccess(familyMember);
      } else {
        setSubmitBtnLoading(false);
        toast.error(response.message);
      }
    }
  };

  const fomatDate = (dateTime: string | undefined) => {
    if (dateTime === undefined) return "";

    return dateTime?.split("T")[0];
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: "8px 0px",
    }),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] ">
      <div>
        <div className="pb-[5px]">First name*</div>
        <input
          type="text"
          className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
          placeholder="Enter First Name"
          value={familyMember.firstName}
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
          value={familyMember.lastName}
          onChange={(e) => onChangeHandler(e.target.value, "lastName")}
        />
        {errorState?.lastName && (
              <ErrorMessage msg={`${errorState.lastName}`} />
            )}
      </div>

      <div>
        <div className="pb-[5px]">Gender*</div>
        <Select
          options={Genders}
          value={Genders.find((item) => item.value === familyMember.gender)}
          styles={customStyles}
          isSearchable={false}
          onChange={(e) => onChangeHandler(e?.value, "gender")}
        />
        {errorState?.gender && (
              <ErrorMessage msg={`${errorState?.gender}`} />
            )}
      </div>

      <div>
        <div className="pb-[5px]">Date of Birth*</div>
        <input
          type="date"
          className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
          value={fomatDate(familyMember.dateOfBirth)}
          onChange={(e) => onChangeHandler(e.target.value, "dateOfBirth")}
        />
        {errorState?.dateOfBirth && (
              <ErrorMessage msg={`${errorState?.dateOfBirth}`} />
            )}
      </div>

      <div>
        <div className="pb-[5px]">Mobile no (Norway only)*</div>
        <div className="relative">
          <div className="absolute flex items-center justify-center h-full pl-[14px]">
            <span className=" text-gray-400">{PhoneCode}</span>
          </div>
          <input
            type="text"
            className="py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium flex-grow focus:border-0 focus-visible:border-0 pl-[44px] pr-[14px] w-full"
            value={familyMember.phoneNumber}
            onChange={(e) => onChangeHandler(e.target.value, "phoneNumber")}
          />
          {errorState?.phoneNumber && (
              <ErrorMessage msg={`${errorState?.phoneNumber}`} />
            )}
        </div>
      </div>

      <div>
        <div className="pb-[5px]">Kommune*</div>
        <Select
          options={CountryList}
          value={CountryList.find(
            (item) => item.value === familyMember.muncipality
          )}
          onChange={(e) => onChangeHandler(e?.value, "muncipality")}
          styles={customStyles}
          isSearchable={false}
        />
        {errorState?.muncipality && (
              <ErrorMessage msg={`${errorState?.muncipality}`} />
            )}
      </div>

      <div></div>
      <div className="text-end">
        <div onClick={onSubmitFormHandler}>
          <MMNButton
            title={submitBtnLoading ? "Loading" : "Update Now"}
            color="white"
            disabled={submitBtnLoading}
            className={"border border-color-mmn-purple"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateForm;
