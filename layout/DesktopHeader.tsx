"use client";

import Image from "next/image";

import SubMenuItem from "./DesktopSubMenuItem";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { menuItemData, MenuItem } from "./Share";
import {useSelector} from "react-redux";
import {GET} from "@/utils/fetch-factory";
import {ProfileType} from "@/app/types/profile.type";
import Modal from "@/components/Modal";
import LoginCard from "@/app/home/LoginCard";

export default function DesktopHeader() {
    const pathName = usePathname();
    const { authresult } = useSelector((state: any) => state.auth);
    const [profileInfo, setProfileInfo] = useState<ProfileType | null>(null);
    const [link, setLink] = useState<string>("");
    const [isLoginModelOpen, setLoginModelOpen] = useState(false);

    useEffect(() => {
        setLink(pathName);
    }, [pathName]);

    useEffect(() => {
       const fetchUserInfo = async () =>{
           if(authresult){
               const profile = await GET('/proxy/user/me');
               setProfileInfo(profile);
           }
        }
        fetchUserInfo();
    }, [authresult]);

    const router = useRouter();
    
    const topMenuClicked = (item: MenuItem) => {
        if (item.link) {
            setLink(item.link);
            router.push(item.link);
        }
    }

    const RenderItems = menuItemData.map((item, index) => {
        const subItemList = item.subItems;

        if (subItemList == undefined) {
            return (
                <div className={`flex border-b-[2px] rounded-b-[6px] px-[30px] py-[15px] cursor-pointer 
                    ${ item.link && link.startsWith(item.link) ? "text-white bg-mmn-red border-[#FFC5B9]" : "bg-white border-white"}
                    hover:bg-[#EAEAEA] hover:border-[#FFC5B9]`}
                    onClick={() => topMenuClicked(item)}
                    key={`desktopheader-${index}`}
                >
                    <div className="line-height-mmn-normal self-center">
                        {item.title}
                    </div>
                </div>
            )
        } else {
            return <SubMenuItem item={item} key={`desktopheader-${index}`} />
        }
    });

    return (
        <>
            <div className="w-full flex gap-[10px] px-[30px] z-[3]">
                <Image
                    src={"/image/logo/HeaderLogo.png"}
                    alt="headerlogo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-[135px] h-auto py-[15px] min-h-[83px]"
                />
                <div className="flex flex-grow px-[30px] gap-[1px] justify-end">
                    {RenderItems}
                    {authresult ? (
                        <SubMenuItem item={{
                            title: `${profileInfo?.firstName} ${profileInfo?.lastName}`,
                            link: '',
                            subItems: [
                                {title: "Membership Details", link: ""},
                                {title: "Change Password", link: "/auth/change-password"},
                                {title: "Logout", link: ""}
                            ]
                        }} key={`desktopHeader-${'account'}`}/>
                    ) : (
                        <div className={`flex border-b-[2px] rounded-b-[6px] px-[30px] py-[15px] cursor-pointer bg-white border-white
                    hover:bg-[#EAEAEA] hover:border-[#FFC5B9]`}
                             onClick={() => setLoginModelOpen(true)}
                             key={`desktopHeader-login`}
                        >
                            <div className="line-height-mmn-normal self-center">
                                Login
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal isOpen={isLoginModelOpen} onClose={() => setLoginModelOpen(false)}>
                <LoginCard onClose={() => setLoginModelOpen(false)}/>
            </Modal>
        </>

    )
}