"use client";
import React, { useState } from "react";
import Container from "../../components/container";
import GoogleButton from "../../components/google-button";
import RenewMemberShip from "./renew-membership";
import Payment from "./payment";
import MemberDetail from "./member-detail";

const page = () => {
  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    setShowDetail(true);
  };

  return (
    <Container>
      <div className="flex flex-col sm:px-[90px] pb-[85px] px-5">
        <div className="flex gap-[10px] font-poppins text-[14px] font-[500] py-10">
          <a href="/home" className="underline text-[#ff5733]">
            Home
          </a>
          <span className="text-black">{">"}</span>
          <a href="/membership" className="text-black" />
          Membership
        </div>
        <div className="flex gap-10 md:flex-row flex-col basis-2/3">
          <div className="flex flex-col">
            <h1 className="font-poppins text-[#00205B] text-[24px] font-[600] leading-normal">
              Become a member
            </h1>
            <h2 className="font-poppins mt-[10px] text-black text-[14px] font-[700] leading-7">
              Marathi Mandal Norway - Membership 2023
            </h2>
            <span className="font-poppins text-[14px] font-[500] leading-7 mt-[5px]">
              This form is sent to you for the membership of Marathi Mandal
              Norway 2023.Please read this form carefully and fill in correct
              information and pay the applicable membership fee for your family.
            </span>
            {showDetail ? (
              <MemberDetail />
            ) : (
              <div className="max-w-[345px] flex flex-col gap-5 pt-5">
                <GoogleButton
                  title="Sign up with Google"
                  action={handleClick}
                />
                <button
                  className="font-poppins font-[500] text-[16px] leading-6 text-white bg-[#00205B] rounded-[6px] py-[13px] px-5"
                  onClick={handleClick}
                >
                  Sign up manually
                </button>
              </div>
            )}
          </div>
          {showDetail ? <Payment /> : <RenewMemberShip />}
        </div>
      </div>
    </Container>
  );
};

export default page;
