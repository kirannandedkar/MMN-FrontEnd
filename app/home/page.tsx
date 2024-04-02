import { Metadata } from "next";
import { GetPageTitle, FavIcon } from "../../constants";
import MMNContainer from "@/components/MMNContainer";
import AboutPane from "./AboutPane";
import VolunteerCard from "./VoluteerCard";
import LoginCard from "./LoginCard";
import MemberCard from "./MemberCard";
import SliderPane from "./SliderPane";

const title = GetPageTitle("Home");


export default function MemberShipPage() {
    return (
        <>
            <SliderPane />
            <MMNContainer className="flex-col">
                <AboutPane />

                <div className="xl:grid xl:grid-cols-3 gap-[40px] pb-[40px] flex flex-col">
                    <VolunteerCard />
                    <LoginCard />
                    <MemberCard />
                </div>
            </MMNContainer>
        </>
    );
}