"use client";
import Image from "next/image";
import React from "react";

interface Props{
  title: string,
  className?: string,
  // action: Function
}
const GoogleButton = (params: Props) => {
  return (
    <div
      className={`flex py-[13px] px-[15px] gap-[15px] items-center rounded-md shadow-custom justify-center cursor-pointer ${params.className || ""}`}
      onClick={() => {}}
    >
      <Image
                src={"/image/logo/GoogleLogo.jpg"}
                alt="googlelogo"
                width="0"
                height="0"
                sizes="100vw"
                className="w-[24px] h-auto"
                />
      
      <h3 className="text-size-mmn-large text-color-mmn-grey font-roboto">
        { params.title }
      </h3>
    </div>
  );
};

export default GoogleButton;
