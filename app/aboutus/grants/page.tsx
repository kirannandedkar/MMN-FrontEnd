import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";
import ApplicationTable from "./ApplicationTable";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "About us", link: "#" },
  { title: "Grants", link: "#" },
];

const GrantsPage = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="min-h-screen flex flex-col bg-white">
          <MMNTitle
            title="Grants"
            className="pb-2 mb-2"
            color="purple"
          />
          <p className="text-gray-700 mb-4">
            Below is the list of grants which we have applied past 2 years. We get grants based on number of members registered so very important that many people take membership so we can get more grants.
          </p>
          <div className="overflow-x-auto">
          <ApplicationTable/>
      </div>
        </div>
      </MMNContainer>
    </div>
  );
};

export default GrantsPage;
