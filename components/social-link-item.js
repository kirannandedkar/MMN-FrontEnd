"use client"
import React from "react";

const SocialLinkItem = ({ title, link }) => {
  return <a href={link} className="font-poppins text-[12px] font-[500]">{title}</a>;
};

export default SocialLinkItem;
