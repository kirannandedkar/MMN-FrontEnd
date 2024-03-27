"use client";

import React, { useState } from "react";
import Select, { AriaOnFocus } from 'react-select';

const MemberDetail = ({userinfo, ...params}) => {
  const [firstName, setFirstName] = useState(userinfo ? userinfo.given_name : "");
  const [lastName, setLastName] = useState(userinfo ? userinfo.family_name : "");
  const [birth, setBirth] = useState(userinfo ? userinfo.birth : "");
  const [email, setEmail] = useState(userinfo ? userinfo.email : "");
  const [country, setCountry] = useState(userinfo ? userinfo.country : "");
  const [mobile, setMobile] = useState(userinfo ? userinfo.mobile : "");
  const [gender, setGender] = useState(userinfo ? userinfo.gender : "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  
  const countryList = [
    {value: "US", label : "United States"},
    {value: "CA", label : "Canada"},
    {value: "NR", label : "Norway"},
    {value: "JP", label : "Japan"},
  ];

  const genderList = [
    {value:'male', label:"Male"},
    {value:'female', label:"FeMale"},
  ];

  const inputClassName = "rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]";
  const labelClassName = "font-poppins text-[14px] font-[500] leading-7";

  return (
    <>
      <div className="flex flex-col gap-[26px]">

        <h2 className="font-[700] font-poppins text-[14px] leading-7 text-black">
          Primary member information
        </h2>

        <div className="flex gap-[26px]">
          <div className="flex flex-col gap-[5px] basis-1/2">
            <label className={labelClassName}>
              First name *
            </label>
            <input
              placeholder="First name"
              className={inputClassName}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[5px] basis-1/2">
            <label className={labelClassName}>
              Last name *
            </label>
            <input
              placeholder="Last name"
              className={inputClassName}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-[26px]">
          <div className="flex flex-col gap-[5px] basis-1/2">
            <label className={labelClassName}>
              Date of birth *
            </label>
            <input
              type="date"
              className={inputClassName}
              value={birth}
              onChange={e => setBirth(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[5px] basis-1/2">
            <label className={labelClassName}>
              Email id *
            </label>
            <input
              placeholder="email@email.no"
              className={inputClassName}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-[26px]">
          <div className="flex flex-col gap-[5px] basis-1/2">
            <label className={labelClassName}>
              Mobile no *
            </label>
            <input
              placeholder="Text goes here"
              className={inputClassName}
              value={mobile}
              onChange={e => setBirth(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[5px] basis-1/2">
            <label className={labelClassName}>
              Kommune *
            </label>
            <select
              id="member-detail-countries"
              class={inputClassName}
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>

        <div className="flex gap-[26px]">
          <div className="flex flex-col gap-[5px] basis-1/2">
            <label className={labelClassName}>
              Gender *
            </label>

            <select
              id="member-detail-gender"
              class={inputClassName}
            >
              <option value="male">Male</option>
              <option value="famale">Female</option>
            </select>

          </div>
        </div>
        {
        !userinfo ?
        (
          <div className="flex gap-[26px]">
                <div className="flex flex-col gap-[5px] basis-1/2">
                  <label className={labelClassName}>
                    Create password *
                  </label>
                  <input
                    type="password"
                    className={inputClassName}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-[5px] basis-1/2">
                  <label className={labelClassName}>
                    Re-type password *
                  </label>
                  <input
                    type="password"
                    className={inputClassName}
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                  />
                </div>
              </div>
        ) : (
          <></>
        )
        }
      </div>

      <div className="flex flex-col py-8 gap-2">
        <div className="font-poppins font-[700] text-[14px] leading-7">
        Add family members
        </div>

        <button className="font-poppins text-[16px] font-[500] rounded-[6px] leading-6 max-w-[360px] text-[#00205B] py-[13px] px-5 border-solid border-[1px] border-[#00205B]">
        + Add family member
        </button>
      </div>
    </>
  );
};

export default MemberDetail;
