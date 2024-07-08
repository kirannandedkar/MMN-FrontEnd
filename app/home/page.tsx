"use client";

import { GetPageTitle } from "../../constants";
import MMNContainer from "@/components/MMNContainer";
import AboutPane from "./AboutPane";
import LoginCard from "./LoginCard";
import MemberCard from "./MemberCard";
import SliderPane from "./SliderPane";
import MMNTitle from "@/components/MMNTItle";
import Image from "next/image";
import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
import {GET} from "@/utils/fetch-factory";
import {useRouter} from "next/navigation";

const title = GetPageTitle("Home");

const sponsorimages = [
    "/image/sponsors/sponsor-1.png",
    "/image/sponsors/sponsor-2.png",
    "/image/sponsors/sponsor-3.png",
    "/image/sponsors/sponsor-4.png",
];

export default function HomePage() {
    const router = useRouter();
    const { authresult } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if(authresult){
            const fetchUserSubscription = async () => {
                const result = await GET("/proxy/User/subscription");
                if(!result.isSubscribed) router.push('/signup/manual');
            }
            fetchUserSubscription();
        }
    }, [authresult]);

    return (
        <>
            {/* {!isCurtainClicked && <Curtain />} */}
            <div>
                <SliderPane />
                <MMNContainer className="flex-col max-w-[1440px] m-auto">
                    <AboutPane />

                    <div className="xl:grid xl:grid-cols-2 gap-[40px] pb-[40px] flex flex-col">
                        {/* <VolunteerCard /> */}
                        {/*{authresult ? <div></div> : <LoginCard />}*/}
                        <MemberCard/>
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