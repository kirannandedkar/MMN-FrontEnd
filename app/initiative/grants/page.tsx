import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";
import ApplicationTable from "./ApplicationTable";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "MMN Initiatives", link: "#" },
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
            The purpose of the MarathiBoli Marathi Shaala is to encourage
            children to speak in Marathi. Children should have the ability to
            conduct meaningful conversations in Marathi due to exposure to the
            language in the classroom and at home. In addition to speaking
            ability, this shaala also emphasizes learning the Devanagari script,
            and reading and writing short essays and letters.
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
