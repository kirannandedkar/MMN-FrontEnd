import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "MMN Initiatives", link: "#" },
  { title: "MarathiBoli Shaala", link: "#" },
];

const MarathiBoliShaalaPage = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="min-h-screen flex flex-col bg-white">
          <video style={{width: '100%', height: '50%'}} controls>
            <source src="/image/marathi-boli/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <MMNTitle
            title="MarathiBoli Marathi Shaala"
            className="pb-2 mb-2"
            color="purple"
          />

          <p className="text-lg font-semibold text-gray-800 mb-2">
            Purposes and goals of the program:
          </p>
          <p className="text-gray-700 mb-4">
            The purpose of the MarathiBoli Shala is to encourage
            children to speak in Marathi. Children should have the ability to
            conduct meaningful conversations in Marathi due to exposure to the
            language in the classroom and at home. In addition to speaking
            ability, this shaala also emphasizes learning the Devanagari script,
            and reading and writing short essays and letters.
          </p>
          <br />
          <p className="text-gray-700 mb-4">
            The MarathiBoli Marathi Shala is operated by Maharashtra Mandal
            Norway, a Oslo-based non-profit organization that encourages Marathi
            cultural and language education among Norway-born Indian children.
          </p>
          <br />
          <p className="text-gray-700 mb-4">
            MMN promotes cultural activities and works to address the needs of
            various age groups in the Marathi community.
          </p>
          <p className="text-gray-700 font-semibold">
            More information contact –{" "}
            <a
              href="mailto:norwaymarathishala@gmail.com"
              className="text-color-mmn-purple underline"
            >
              norwaymarathishala@gmail.com
            </a>
          </p>
        </div>
      </MMNContainer>
    </div>
  );
};

export default MarathiBoliShaalaPage;
