import React from "react";
import TopNav from "@/components/TopNav";
import ImageGallery from "./ImageGallery";
import MMNContainer from "@/components/MMNContainer";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Gallery", link: "/gallery" }
];

const HistoryPage = () => {
  return (
   <>
   
    <div className="max-w-[1440px] m-auto">
    <TopNav itemList={NavData} />
      <MMNContainer>
        <ImageGallery/>
      </MMNContainer>
    </div>
   </>
  );
};

export default HistoryPage;
