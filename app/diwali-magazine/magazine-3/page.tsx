import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Diwali Magazine", link: "#" },
  { title: "Magazine 3", link: "#" },
];

const Magazine3 = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="min-h-screen flex flex-col bg-white p-4 sm:p-6 lg:p-8">
          <MMNTitle title="Magazine 3" className="pb-2 mb-4" color="purple" />
          
          <img src="/image/magazine/3.jpg" alt="" style={{width: '100%'}} />
        </div>
      </MMNContainer>
    </div>
  );
};

export default Magazine3;
