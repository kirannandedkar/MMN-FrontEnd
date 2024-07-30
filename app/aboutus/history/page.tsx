import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";
import ApplicationTable from "@/app/initiative/grants/ApplicationTable";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "About us", link: "#" },
  { title: "MMN History", link: "#" },
];

const HistoryPage = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="min-h-screen flex flex-col bg-white">
          <MMNTitle
            title="A Brief History of The Mandal"
            className="pb-2 mb-2"
            color="purple"
          />

          <p className="text-gray-800 mb-2">
          Maharashtra Mandal Norway, Oslo is one of the oldest Marathi organisations in Norway.
          </p>
          <br />
          <p className="text-gray-800 mb-2">Maharashtra Mandal Norway was formed in 2004.
 It was founded by senior Mr & Mrs Arvind Phatak, Mr & Mrs Shrikant Prabhu, Mr & Mrs Arun Aurangabadkar, Mrs. Pratima Mundhe. The Mandal later flourished with enthusiastic families joining & celebrating festivals.
          </p>

          <p className="font-semibold text-gray-800 mb-2">
          It continued to organise several get together/programmes in last 20 years.
          </p>
          <br />

          <p className="text-gray-800 mb-2">
          A new generation of Maharashtrian young families joined hands and made the Mandal a meeting place. Marathi music concerts, dramas, Marathi cuisine and Diwali Dinners were organised. <br />
          Consequently, the Mandal played host to many renowned artists from India. It was also visited by prominent personalities such Mr. Prashant Damle, Mr. Sudhir Gadgil, Mr. Dilip Prabhavalkar, Mrs. Vandana Gupte.
          </p>
        </div>
      </MMNContainer>
    </div>
  );
};

export default HistoryPage;
