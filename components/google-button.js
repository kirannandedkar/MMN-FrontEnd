"use client";
import Image from "next/image";
import React from "react";

const GoogleButton = ({ title, action }) => {
  return (
    <button
      className="flex py-[13px] px-[15px] gap-[15px] items-center rounded-md shadow-custom justify-center"
      onClick={action}
    >
      <Image
        src={"/image/Google Logo.jpg"}
        alt="google"
        width={24}
        height={24}
      />
      <h3 className="text-[20px] font-[500] text-[#757575] font-roboto">
        {title}
      </h3>
    </button>
  );
};

export default GoogleButton;
