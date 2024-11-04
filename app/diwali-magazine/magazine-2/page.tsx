import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";
import ViewPDF from "@/components/PdfViewer";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Diwali Magazine", link: "#" },
  { title: "Magazine 2", link: "#" },
];

const Magazine2 = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="min-h-screen flex flex-col bg-white p-4 sm:p-6 lg:p-8">
          <MMNTitle title="Magazine 2" className="pb-2 mb-4" color="purple" />
          <img className="img" src="/image/magazine/m-2/0.jpg" alt="1" style={{width: '100%'}} />
          <br />
          <img src="/image/magazine/m-2/1.jpg" alt="2" style={{width: '100%'}} />
        </div>
      </MMNContainer>
    </div>
  );
};

export default Magazine2;
