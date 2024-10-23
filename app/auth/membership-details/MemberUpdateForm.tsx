import { ErrorMessage } from "@/components/ErrorMessage";
import MMNButton from "@/components/MMNButton";
import { PhoneCode } from "@/constants";
import { FamilyAccountInfo, FamilyMember, Genders, Relationships } from "@/constants/types";
import { POST } from "@/utils/fetch-factory";
import { camelCaseToSentenceCase, validatedForm } from "@/utils/form";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const initialFamilyMember = {
    id: "N/A",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: ""
  };
  
interface IProps {
  userInfo: FamilyMember | undefined;
  updatedSuccess: () => void
}

const MemberUpdateForm = ({ userInfo, updatedSuccess }: IProps) => {

    const [familyMember, setFamilyMember] =
    useState<FamilyMember>(userInfo!);

  const [errorState, setErrorState] =
    useState<FamilyMember>(initialFamilyMember);

    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

    const validate = (
        formState: FamilyMember,
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
    const validationResult = validatedForm<FamilyMember>(
      errorState,
      familyMember
    );
    const validateState: FamilyMember = {
      ...validationResult.updatedErrorState,
    };

    setErrorState(validateState);
    if (validationResult.isValid) {
        setSubmitBtnLoading(true);
        const response = await POST(`/proxy/family-members/${familyMember.id}`, familyMember);
      if (response.isSuccess) {
        setSubmitBtnLoading(false);
        toast.success("Family member has been updated!");
        updatedSuccess();
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
            <div className="pb-[5px]">Email*</div>
            <input
              type="text"
              className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
              placeholder="email@email.no"
              value={familyMember?.email}
              onChange={(e) => onChangeHandler(e.target.value, "email")}
            />
            {errorState?.email && <ErrorMessage msg={`${errorState?.email}`} />}
          </div>

      <div>
      <div>
            <div className="pb-[5px]">Relationship*</div>
            <>
              <Select
                options={Relationships}
                value={Relationships.find(
                  (item) => item.value === familyMember?.relation
                )}
                onChange={(e) => onChangeHandler(e?.value, "relation")}
                isSearchable={false}
                styles={customStyles}
              />
              {errorState?.relation && <ErrorMessage msg={`Select relation`} />}
            </>
          </div>
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

export default MemberUpdateForm;
