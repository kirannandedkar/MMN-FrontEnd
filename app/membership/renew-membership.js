import React from "react";

const RenewMemberShip = () => {
  return (
    <div className="border-solid border-[#D9D9D9] border-[1px] rounded-[10px] p-6 flex flex-col gap-[14px] max-w-[420px] w-full">
      <h2 className="font-poppins font-[600] text-[24px] leading-9 text-[#00205B]">
        Renew membership?
      </h2>
      <div className="flex items-center font-poppins text-[14px] leading-[21px] font-[500]">
        <span className="text-black">Price:</span>
        <span className="text-[#ff5733] ml-[18px]">kr 160</span>
        <span className="ml-[13px]">per member</span>
      </div>
      <p className="leading-7 italic font-poppins text-[14px]">
        To renew your membership, please enter your{" "}
        <span className="font-[700]">Member ID</span> or
        <span className="font-[700]"> Registered Email ID</span>
      </p>
      <div className="flex flex-col gap-[5px]">
        <label className="leading-7 font-poppins text-[14px]">
          Member id/Email id *
        </label>
        <input
          className="rounded-[6px] border-solid border-[1px] border-[#BCBCBC] px-[14px] py-4 font-poppins text-[14px] leading-6"
          placeholder="Enter member ID"
        />
      </div>
      <button className="font-poppins max-w-[240px] w-full h-[50px] rounded-[6px] py-[13px] px-5 bg-[#00205B] text-white self-end">
        Renew membership now
      </button>
    </div>
  );
};

export default RenewMemberShip;
