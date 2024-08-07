import React from "react";
import TopNav from "@/components/TopNav";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "Gallery", link: "/gallery" }
];

const HistoryPage = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <div className="flex items-center justify-center">
      <img src="/image/gallery/commin-soon.gif" alt="Coming sopon" />
    </div>
    </div>
  );
};

export default HistoryPage;
