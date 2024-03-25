import React from "react";

const MemberDetail = () => {
  return (
    <div className="flex flex-col gap-[26px]">
      <h2 className="font-[700] font-poppins text-[14px] leading-7 text-black">
        Primary member information
      </h2>
      <div className="flex gap-[26px]">
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            First name *
          </label>
          <input className="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]" />
        </div>
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            First name *
          </label>
          <input className="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]" />
        </div>
      </div>
      <div className="flex gap-[26px]">
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            First name *
          </label>
          <input
            placeholder="First name"
            className="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]"
          />
        </div>
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            Last name *
          </label>
          <input
            placeholder="Last name"
            className="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]"
          />
        </div>
      </div>
      <div className="flex gap-[26px]">
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            Date of birth *
          </label>
          <input
            type="date"
            className="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]"
          />
        </div>
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            Email id *
          </label>
          <input
            placeholder="email@email.no"
            className="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]"
          />
        </div>
      </div>
      <div className="flex gap-[26px]">
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            Mobile no *
          </label>
          <input
            placeholder="Text goes here"
            className="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]"
          />
        </div>
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            Kommune *
          </label>
          <select
            id="countries"
            class="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]"
          >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
      <div className="flex gap-[26px]">
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            Gender *
          </label>
          <select
            id="countries"
            class="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]"
          >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
      <div className="flex gap-[26px]">
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            Create password *
          </label>
          <input
            type="password"
            className="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]"
          />
        </div>
        <div className="flex flex-col gap-[5px] basis-1/2">
          <label className="font-poppins text-[14px] font-[500] leading-7">
            Re-type password *
          </label>
          <input
            type="password"
            className="basis-1/2 rounded-[6px] py-4 px-[14px] font-poppins text-[14px] font-[500] leading-6 border-solid border-[1px] border-[#BCBCBC]"
          />
        </div>
      </div>
      <span className="font-poppins font-[700] text-[14px] leading-7">
        Add family members
      </span>
      <button className="font-poppins text-[16px] font-[500] rounded-[6px] leading-6 text-[#00205B] max-w-[218px] py-[13px] px-5 border-solid border-[1px] border-[#00205B]">
        + Add family member
      </button>
    </div>
  );
};

export default MemberDetail;
