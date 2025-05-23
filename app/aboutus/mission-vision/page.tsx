import React from "react";
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import MMNTitle from "@/components/MMNTItle";
import ApplicationTable from "@/app/initiative/grants/ApplicationTable";

const NavData = [
  { title: "Home", link: "/home" },
  { title: "About us", link: "#" },
  { title: "Mission and Vision", link: "#" },
];

const MissionVisionPage = () => {
  return (
    <div className="max-w-[1440px] m-auto">
      <TopNav itemList={NavData} />
      <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
        <div className="min-h-screen flex flex-col bg-white">
          <MMNTitle
            title="Mission and Vision"
            className="pb-2 mb-2"
            color="purple"
          />

          <p className="text-gray-800 mb-2">
            MMN is a Non-Profit Organization serving in the Oslo area in Norway since 2004.
          </p>
          <br />
          
          <h2 className="text-lg font-bold text-gray-800 my-2">Our mission is</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              To preserve, promote and integrate Maharashtrian culture, language and traditions among persons interested in Maharashtrian heritage & facilitate communication with its members.
            </li>
            <li>
              MMN shall work towards the integration of Maharashtrian community with other Indian communities as well as with Norwegian and other international communities by organizing art, cultural, music and other Social events.
            </li>
          </ul>

          <br />
          <p className="text-lg font-bold text-gray-800 my-2">
            Maharashtra Mandal Norway acquired title as Frivillige / Non-Profit organisation in November 2021.
          </p>
         

          <p className="text-gray-800 mb-2">
            The Mandal started performing its activities effectively and put its development work on a permanent footing. Since then, the Mandal continues to organise 9 to 10 cultural functions every year.
          </p>
          <br />
          <p className="text-gray-800">
            We are a team of volunteers who are interested in Marathi culture and include everyone who is willing to work hard and give their expertise, talent and time to the community. If interested in joining hands with the team as a volunteer, please feel free to contact us.
          </p>
          <p className="text-gray-800 mt-2">
            Here are some of the activities we are involved in on a regular basis such as –
          </p>
          <br/>
          
          <div className="bg-white">
            <h2 className="text-lg font-bold text-gray-800 my-2">
              Cultural Events
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gudhipadwa</li>
              <li>
                Maharashtra Day with Chatrapati Shivaji Maharaj Palkhi which gives an opportunity to showcase Marathi Sanskriti in foreign land.
              </li>
              <li>
                Shree Ganeshotsav is the most important event organised by the Mandal with active participation of all members. All activities are organised with emphasis on the Marathi culture and strongly reflect Marathi tradition and Maharashtrians' love for Bappa and music.
              </li>
              <li>
                Diwali - These festivals give the community a chance to renew the cultural ties and encourage children to learn about the culture.
              </li>
            </ul>
            <br />
            
            <h2 className="text-lg font-bold text-gray-800 my-2">
              Social Events
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Annual Sport Day provides facility to children & families to come together for sports.
              </li>
              <li>
                Canvas Fest - This is an Art event; we provide platform to the local talents in painting. And revenue generated from sale of art to be donated for the social cause.
              </li>
              <li>Shravan Bhet - Talent hunt gathering for women.</li>
              <li>
                Elder hus visit - We work hand in hand with other organizations in Norway, dedicated to running community service programs.
              </li>
            </ul>
          </div>
          <br/>
          
          <p className="text-gray-800 mb-2">
            While the mandal is a platform for grown-ups to socialise and mingle with each other, it also provides a wonderful window to the next generation to experience Maharashtra as well as India in this forum. We want to give them a platform to make new friends, learn about our culture.
          </p>
          <br/>
          
          {/* <ApplicationTable/> */}
        </div>
      </MMNContainer>
    </div>
  );
};

export default MissionVisionPage;