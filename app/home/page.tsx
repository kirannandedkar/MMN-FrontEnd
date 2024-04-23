"use client";

import { Metadata } from "next";
import { GetPageTitle, FavIcon } from "../../constants";
import MMNContainer from "@/components/MMNContainer";
import AboutPane from "./AboutPane";
import VolunteerCard from "./VoluteerCard";
import LoginCard from "./LoginCard";
import MemberCard from "./MemberCard";
import SliderPane from "./SliderPane";
import MMNTitle from "@/components/MMNTItle";
import Image from "next/image";
import Curtain from "@/components/Curtain";
import { useState } from "react";

const title = GetPageTitle("Home");

const sponsorimages = [
    "/image/sponsors/sponsor-1.png",
    "/image/sponsors/sponsor-2.png",
    "/image/sponsors/sponsor-3.png",
    "/image/sponsors/sponsor-4.png",
];

export default function MemberShipPage() {
    const [clicked, setClicked] = useState(false);

    return (
        <>
            {/* <Curtain onClicked={() => { setClicked(true) }} /> */}
            <div>
                <SliderPane />
                <MMNContainer className="flex-col max-w-[1440px] m-auto">
                    <AboutPane />

                    <div className="xl:grid xl:grid-cols-2 gap-[40px] pb-[40px] flex flex-col">
                        {/* <VolunteerCard /> */}
                        <LoginCard />
                        <MemberCard />
                    </div>

                    <div className="flex flex-col gap-[30px] pb-[40px]">
                        <MMNTitle title="Our sponsors" color="purple" />

                        <div className="flex flex-wrap gap-[34px]">
                            {
                                sponsorimages.map((item, index) => {
                                    return (
                                        <div key={`sponsor-${index}`}>
                                            <Image
                                                src={item as string}
                                                alt={`sponsor-${index}`}
                                                width={140}
                                                height={140}
                                            />
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </MMNContainer>
            </div>
        </>
    );
}