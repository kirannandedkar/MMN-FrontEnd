"use client";

import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";
import MMNButton from "@/components/MMNButton";
import { IContactUs } from "@/constants/types";
import { useState } from "react";
import { camelCaseToSentenceCase } from "@/utils/form";
import { ErrorMessage } from "../signup/ErrorMessage";
import {GET, POST} from "@/utils/fetch-factory";
import { toast } from "react-toastify";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Contact Us", link: "#" },
];

const contactUsIntialData = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  subject: "",
  message: "",
};
const ContactUsPage = () => {
  const [formData, setFormData] = useState<IContactUs>(contactUsIntialData);
  const [formState, setFormatState] = useState<IContactUs>(contactUsIntialData);

  //Family member related handler
  const onInputChangeHandler = (
    value: string | undefined | null,
    fieldName: string
  ) => {
    const updatedData = { ...formData };
    updatedData[fieldName] = value;

    //field validation
    let updateFormState = { ...formState };
    updateFormState = validate(updateFormState, value, fieldName);

    setFormData(updatedData);
    setFormatState(updateFormState);
  };

  const validate = (
    formState: IContactUs,
    value: string | undefined | null,
    fieldName: string
  ) => {
    const updated = { ...formState };
    if (isNotValid(value)) {
      updated[fieldName] = `${camelCaseToSentenceCase(
        fieldName
      )} field is required`;
    } else updated[fieldName] = null;
    return updated;
  };

  const checkFormValidation = () => {
    debugger;
    let isValid = true;
    let updatedState = {...formState}
    for(let key in formData){
        let value = formData[key];
        updatedState = validate(updatedState, value, key);
        isValid = isValid && !isNotValid(value);
    }
    setFormatState(updatedState);
    return isValid;
  }

  const isNotValid = (value: string | undefined | null) => {
    return value == null || value === "";
  }

  const formSubmitHandler = async () => {
    if(checkFormValidation()){
        const result = await POST("/proxy/contact-us", formData);
        if(result.isSuccess){
            setFormData(contactUsIntialData);
            setFormatState(contactUsIntialData);
            toast.info('Thank you for contacting us.');
        }
    }
  }

  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="mx-auto flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/image/contact-us/banner.png"
              alt="logo"
              className="max-w-full h-auto"
              style={{ width: "60%" }}
            />
          </div>
          <div className="w-full lg:w-1/2 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center lg:text-left">
              Contact us
            </h2>
            <p className="text-center lg:text-left mb-6">
              For any questions you may have, please do not hesitate to reach
              us.
              <br />
              You can write us an email on{" "}
              <a
                href="mailto:mmn@marathimandal-norway.no"
                className="text-blue-500"
              >
                mmn@marathimandal-norway.no
              </a>
            </p>
            <form className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    value={formData?.firstName}
                    onChange={(e) => onInputChangeHandler(e.target.value, 'firstName')}
                  />
                   {formState?.firstName && <ErrorMessage msg={`${formState.firstName}`}/>}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    value={formData?.lastName}
                    onChange={(e) => onInputChangeHandler(e.target.value, 'lastName')}
                  />
                  {formState?.lastName && <ErrorMessage msg={`${formState.lastName}`}/>}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email id *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    value={formData?.email}
                    onChange={(e) => onInputChangeHandler(e.target.value, 'email')}
                  />
                  {formState?.email && <ErrorMessage msg={`${formState.email}`}/>}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact number *
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    value={formData?.contactNumber}
                    onChange={(e) => onInputChangeHandler(e.target.value, 'contactNumber')}
                  />
                  {formState?.contactNumber && <ErrorMessage msg={`${formState.contactNumber}`}/>}
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  value={formData?.subject}
                  onChange={(e) => onInputChangeHandler(e.target.value, 'subject')}
                >
                  <option value="">Select Subject</option>
                  <option value="Feedback & Queries">Feedback & Queries</option>
                  <option value="Grant & Sponsorship">
                    Grant & Sponsorship
                  </option>
                  <option value="Queries about Shala">
                    Queries about Shala
                  </option>
                  <option value="Queries about MMN Membership">
                    Queries about MMN Membership
                  </option>
                  <option value="Queries about MMN Membership">Other</option>
                </select>
                {formState?.subject && <ErrorMessage msg={`${formState.subject}`}/>}
              </div>
              <div className="w-full">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={(e) => onInputChangeHandler(e.target.value, 'message')}
                  value={formData?.message}
                ></textarea>
                {formState?.subject && <ErrorMessage msg={`${formState.subject}`}/>}
              </div>
              <div onClick={formSubmitHandler} className="flex justify-center lg:justify-end">
                <MMNButton title={"Submit"} color="purple" />
              </div>
            </form>
          </div>
        </div>
      </MMNContainer>
    </div>
  );
};

export default ContactUsPage;
