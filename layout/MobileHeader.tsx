"use client";

import Image from "next/image";

import Line3horizontal from "@/components/icons/Line3horizontal";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import MobileSubMenuItem from "./MobileSubMenuItem";

const menuItems = [
    { title: "Home", link: "/home" },
    {
        title: "About us",
        link: "/aboutus",
        subItems: [
            { title: "Mission and Vision", link: "" },
            { title: "MMN History", link: "" },
            { title: "MMN Constitution", link: "" },
            { title: "Committee Members", link: "/committeemember" },
            { title: "Become a MMN member", link: "" },
        ]
    },
    { title: "MemberShip", link: "/membership" },
    { title: "Event", link: "" },
    { title: "Gallery", link: "" },
    { title: "MMN Initiatives", link: "" },
    { title: "Contact us", link: "" },
    { title: "Login", link: "" },
]

export default function MobileHeader() {

    const [showMenuFlag, setShowMenuFlag] = useState<boolean>(false);

    const router = useRouter();

    const menuClicked = (link: string) => {
        setShowMenuFlag(false);
        if (link)
            router.push(link);
    }

    return (
        <div className="relative z-[100] text-[12px]" onMouseLeave={() => setShowMenuFlag(false)}>
            <div className="w-full flex gap-[10px] px-[30px] z-[100] items-center justify-between">
                <Image
                    src={"/image/logo/HeaderLogo.png"}
                    alt="headerlogo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-[60px] md:w-[90px] h-auto py-[10px]"
                />
                <div className="py-[10px] px-[5px] hover:opacity-20 rounded-[5px] cursor-pointer" onClick={() => setShowMenuFlag(!showMenuFlag)}>
                    <Line3horizontal />
                </div>
            </div>

            {
                showMenuFlag ?
                    <div className="absolute md:top-[55px] top-[44px] right-[0px] w-max border-b-[2px] rounded-b-[6px] border-[#808080] border-b-[2px] bg-[#ECE9E9] flex flex-col p-[2px] cursor-pointer">
                        {
                            menuItems?.map((item, index) => {
                                if (item.subItems) {
                                    return <div key={index}>
                                        <MobileSubMenuItem item={item} callback={() => setShowMenuFlag(false)} />
                                    </div>
                                } else {
                                    return (
                                        <div className="flex hover:text-color-mmn-yellow hover:bg-white py-[10px] px-[15px] sm:py-[20px] sm:px-[30px] animate-dissolve ease-out duration-300"
                                            key={index}
                                            onClick={() => { menuClicked(item.link) }}>
                                            <div className="lead-[21px] self-center">{item.title}</div>
                                        </div>)
                                }
                            })
                        }
                    </div> : <></>
            }
        </div>
    )
}