import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";
import ApplicationTable from "@/app/initiative/grants/ApplicationTable";
import Profile from "./Profile";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "About us", link: "#" },
  { title: "MMN History", link: "#" },
];

const members = [
  { name: 'Arvind Phatak', image: '/image/members/executive/Arvind.jpg' },
  { name: 'Arun Aurangabadkar', image: '/image/members/executive/Arun.jpg' },
  { name: 'Aruna Phatak', image: '/image/members/executive/Aruna.jpg' },
  { name: 'Smita Aurangabadkar', image: '/image/members/executive/member1.jpg' },
  { name: 'Pratima Mundhe', image: '/image/members/executive/member1.jpg' },
]

const HistoryPage = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="min-h-screen flex flex-col bg-white p-4 sm:p-6 lg:p-8">
          <MMNTitle
            title="A Brief History of The Mandal"
            className="pb-2 mb-4"
            color="purple"
          />

          <p className="text-gray-800 mb-4 text-sm sm:text-base lg:text-lg">
            Maharashtra Mandal Norway, Oslo is one of the oldest Marathi organisations in Norway.
          </p>
          <p className="text-gray-800 mb-4 text-sm sm:text-base lg:text-lg">
            Maharashtra Mandal Norway was formed in 2004. It was founded by senior Mr & Mrs Arvind Phatak, Mr & Mrs Shrikant Prabhu, Mr & Mrs Arun Aurangabadkar, Mrs. Pratima Mundhe. The Mandal later flourished with enthusiastic families joining & celebrating festivals.
          </p>

          <p className="font-semibold text-gray-800 mb-4 text-sm sm:text-base lg:text-lg">
            It continued to organise several get together/programmes in last 20 years.
          </p>

          <p className="text-gray-800 mb-4 text-sm sm:text-base lg:text-lg">
            A new generation of Maharashtrian young families joined hands and made the Mandal a meeting place. Marathi music concerts, dramas, Marathi cuisine and Diwali Dinners were organised. <br />
            Consequently, the Mandal played host to many renowned artists from India. It was also visited by prominent personalities such as Mr. Prashant Damle, Mr. Sudhir Gadgil, Mr. Dilip Prabhavalkar, Mrs. Vandana Gupte.
          </p>

          <MMNTitle
            title="Founds of MMN"
            className="pb-2 mt-10"
            color="purple"
          />

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            {members.map((member, index) => (
              <Profile member={member} key={index} />
            ))}
          </div>
        </div>
      </MMNContainer>
    </div>
  );
};

export default HistoryPage;
