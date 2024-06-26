"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MenuItem } from "./Share";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {SignOut} from "@/redux/user/auth.action";

export default function SubMenuItem({ item }: {item: MenuItem}) {
    const router = useRouter();
    const pathName = usePathname();
    const dispatch = useDispatch<AppDispatch>();

    const [popupFlag, setPopupFlag] = useState(false);

    const items = item.subItems;
    const title = item.title;
    const parentPath = item.link;

    const [link, setLink] = useState<string>("");
    useEffect(() => {
        setLink(pathName);
    }, [pathName]);

    const subMenuClicked = (subItem: MenuItem) => {
        if (subItem.title === 'Logout') dispatch(SignOut());
        if (subItem.link) router.push(parentPath + subItem.link);
        if (subItem.href) window.open(subItem.href, "_blank");
        setPopupFlag(false);
    }

    return (
        <div className={`flex relative px-[30px] py-[15px] border-b-[2px] rounded-b-[6px] cursor-pointer z-[3]
        ${item.link && link.startsWith(item.link) ? "text-white bg-mmn-red border-[#FFC5B9]" : "bg-white border-white"} 
        hover:bg-[#EAEAEA] hover:border-[#FFC5B9] hover:text-black`}

            onMouseOver={e => setPopupFlag(true)}
            onMouseLeave={e => setPopupFlag(false)}
        >
            <div className="line-height-mmn-normal self-center flex gap-[6px] items-center">
                {item.icon}
                <span>  {title} </span>
                {popupFlag ? '⮝' : '⮟' }
            </div>

            {
                popupFlag ?
                    <div className="absolute cusor-pointer text-black top-[83px] left-[0px] w-max border-b-[2px] rounded-b-[6px] border-[#808080] border-b-[2px] bg-[#ECE9E9] flex flex-col p-[2px]">
                        {
                            items?.map((item, index) => (
                                <div className="flex hover:text-[#FF5733] hover:bg-white p-[20px] animate-dissolve ease-out duration-300"
                                    key={`desktopsubmenuitem-${index}`}
                                    onClick={() => subMenuClicked(item)}>
                                    <div className="lead-[21px] self-center">{item.title}</div>
                                </div>
                            ))
                        }
                    </div> : <></>
            }
        </div>
    )
}