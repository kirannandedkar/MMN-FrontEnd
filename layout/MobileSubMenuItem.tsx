"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ArrowDown from "@/components/icons/ArrowDown"
import ArrowUp from "@/components/icons/ArrowUp"
import { MenuItem } from "./Share";
import {SignOut} from "@/redux/user/auth.action";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";

export default function MobileSubMenuItem({ item, callback }: {
    item: MenuItem,
    callback?: () => void
}) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [popupFlag, setPopupFlag] = useState(false);

    const items = item.subItems;
    const parentPath = item.link;

    const subMenuClicked = (subItem: MenuItem) => {
        if (subItem.title === 'Logout') dispatch(SignOut());

        if (subItem.link)
            router.push(parentPath + subItem.link);
        if (subItem.href)
            window.open(subItem.href, "_blank");
        setPopupFlag(false);
        if (callback) callback();
    }

    return (
        <div className="hover:text-color-mmn-yellow hover:bg-white py-[10px] px-[15px] sm:py-[20px] sm:px-[30px]  animate-dissolve ease-out duration-300 relative">
            {
                popupFlag ?
                    <div className="absolute right-[123px] sm:right-[153px] top-[0px] w-max border-b-[2px] rounded-[6px] border-[#808080] border-b-[2px] bg-[#ECE9E9] flex flex-col p-[2px]">
                        {
                            items?.map((item, index) => (
                                <div className="flex cusor-pointer hover:text-[#FF5733] hover:bg-white py-[10px] px-[15px] sm:py-[20px] sm:px-[30px] animate-dissolve ease-out duration-300"
                                    key={`mobilesubmenuitem-${index}`}
                                    onClick={() => subMenuClicked(item)}>
                                    <div className="lead-[21px] self-center">{item.title}</div>
                                </div>
                            ))
                        }
                    </div> : <></>
            }
            <div className="lead-[21px] self-center flex items-center gap-[10px]" onClick={() => setPopupFlag(true)}>
                {item.icon}
                <span> {item.title} </span>
                {popupFlag ? '⮝' : '⮟'}
            </div>
        </div>
    )
}