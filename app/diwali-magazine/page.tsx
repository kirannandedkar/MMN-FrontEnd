"use client";

import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";
// import Flipbook from "@/components/PdfViewer";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Diwali Magazine", link: "#" },
];

const Magazine = () => {
  return (
    <div className="max-w-[1440px] m-auto">
     
      <MMNContainer className="gap-[40px] pb-[40px]">
        <embed
          src="https://online.fliphtml5.com/bwold/czem/"
          className="magazine"
          type=""
          style={{ width: "100%", height: "50rem" }}
        />
      </MMNContainer>
    </div>
  );
};

export default Magazine;
