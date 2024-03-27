"use client";
import React from "react";
import Button from "../button";
import { useRouter } from "next/navigation";

const MemberCard = () => {
  const router = useRouter();
  const handleClick = () => {
    console.log("ok");
  };

  return (
    <div className="p-6 flex flex-col rounded-[10px] border-2 gap-[14px] flex-1 min-h-[442px] bg-[#FF5733]">
      <h2 className="text-white text-2xl font-[600]">Become a member</h2>
      <div className="inline-flex text-white text-[14px] font-[500] items-center">
        <span>Price:</span>
        <span className="px-[8px] py-[4px] rounded-[3px] bg-white text-[#FF5733] text-[14px] font-[600] font-poppins ml-[10px]">
          kr 150
        </span>
        <span className="ml-[5px]">per member</span>
      </div>
      <p className="leading-7 text-[14px] font-[500] text-white">
        MMN Membership goes from January to December of each year. Do check our
        membership benefits and join us.
      </p>
      <Button
        title={"Become a member"}
        style={"text-[#00205B] bg-white"}
        onClick={() => router.push('/membership')}
      />
    </div>
  );
};

export default MemberCard;
