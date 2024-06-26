"use client";

import Image from "next/image";

import Line3horizontal from "@/components/icons/Line3horizontal";
import { useRouter, usePathname } from "next/navigation";
import {useEffect, useState} from "react";
import MobileSubMenuItem from "./MobileSubMenuItem";
import { menuItemData } from "./Share";
import {useSelector} from "react-redux";
import {GET} from "@/utils/fetch-factory";
import {ProfileType} from "@/app/types/profile.type";
import Profile from "@/components/icons/Profile";
import Modal from "@/components/Modal";
import LoginCard from "@/app/home/LoginCard";

export default function MobileHeader() {

    const [showMenuFlag, setShowMenuFlag] = useState<boolean>(false);

    const router = useRouter();
    const { authresult } = useSelector((state: any) => state.auth);
    const [profileInfo, setProfileInfo] = useState<ProfileType | null>(null);
    const [isLoginModelOpen, setLoginModelOpen] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () =>{
            if(authresult){
                const profile = await GET('/proxy/user/me');
                setProfileInfo(profile);
            }
        }
        fetchUserInfo();
    }, [authresult]);

    const topMenuClicked = (link: string) => {
        setShowMenuFlag(false);
        if (link)
            router.push(link);
    }

    return (
        <>
            <div className="relative z-[4] text-[12px]" onMouseLeave={() => setShowMenuFlag(false)}>
                <div className="w-full flex gap-[10px] px-[30px] items-center justify-between">
                    <Image
                        src={"/image/logo/HeaderLogo.png"}
                        alt="headerlogo"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-[60px] md:w-[90px] h-auto py-[10px]"
                    />
                    <div className="py-[10px] px-[5px] hover:opacity-20 rounded-[5px] cursor-pointer"
                         onClick={() => setShowMenuFlag(!showMenuFlag)}
                    >
                        <Line3horizontal/>
                    </div>
                </div>

                {
                    showMenuFlag ?
                        <div
                            className="absolute md:top-[55px] top-[44px] right-[0px] w-max border-b-[2px] rounded-b-[6px] border-[#808080] border-b-[2px] bg-[#ECE9E9] flex flex-col p-[2px] cursor-pointer">
                            {
                                menuItemData?.map((item, index) => {
                                    if (item.subItems) {
                                        return <div key={`mobileheader-${index}`}>
                                            <MobileSubMenuItem item={item} callback={() => setShowMenuFlag(false)}/>
                                        </div>
                                    } else {
                                        return (
                                            <div
                                                className="flex hover:text-color-mmn-yellow hover:bg-white py-[10px] px-[15px] sm:py-[20px] sm:px-[30px] animate-dissolve ease-out duration-300"
                                                key={`mobileheader-${index}`}
                                                onClick={() => {
                                                    topMenuClicked(item.link)
                                                }}>
                                                <div className="lead-[21px] self-center">{item.title}</div>
                                            </div>)
                                    }
                                })
                            }

                            {authresult ? (
                                <div key={`mobileheader-login`}>
                                    <MobileSubMenuItem item={{
                                        title: `${profileInfo?.firstName} ${profileInfo?.lastName}`,
                                        icon: <Profile/>,
                                        link: '',
                                        subItems: [
                                            {title: "Membership Details", link: "/auth/membership-details"},
                                            {title: "Change Password", link: "/auth/change-password"},
                                            {title: "Logout", link: ""}
                                        ]
                                    }} callback={() => setShowMenuFlag(false)}/>
                                </div>
                            ) : (
                                <div
                                    className="flex hover:text-color-mmn-yellow hover:bg-white py-[10px] px-[15px] sm:py-[20px] sm:px-[30px] animate-dissolve ease-out duration-300"
                                    key={`mobileheader-login`}
                                    onClick={() => setLoginModelOpen(true)}>
                                    <div className="lead-[21px] self-center">Login</div>
                                </div>
                            )}
                        </div> : <></>
                }
            </div>
            <Modal isOpen={isLoginModelOpen} onClose={() => setLoginModelOpen(false)}>
                <LoginCard onClose={() => setLoginModelOpen(false)}/>
            </Modal>
        </>
    )
}