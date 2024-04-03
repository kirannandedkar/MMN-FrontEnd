"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ArrowDown from "@/components/icons/ArrowDown"
import ArrowUp from "@/components/icons/ArrowUp"

interface Item {
    title: string,
    link: string,
}

interface Props {
    item: {
        title: string, link: string, subItems: Item[]
    },
    callback?: () => void
}

export default function MobileSubMenuItem({ item, callback }: Props) {
    const router = useRouter();

    const [popupFlag, setPopupFlag] = useState(false);

    const items = item.subItems;
    const parentPath = item.link;

    const handleClick = (subItem: Item) => {
        if (subItem.link)
            router.push(parentPath + subItem.link);
        setPopupFlag(false);
        if (callback) callback();
    }

    return (
        <div className="hover:text-color-mmn-yellow hover:bg-white py-[10px] px-[15px] sm:py-[20px] sm:px-[30px]  animate-dissolve ease-out duration-300 relative"
            onMouseOver={() => setPopupFlag(true)}
            onMouseOut={() => setPopupFlag(false)}
        >
            {
                popupFlag ?
                    <div className="absolute right-[123px] sm:right-[153px] top-[0px] w-max border-b-[2px] rounded-[6px] border-[#808080] border-b-[2px] bg-[#ECE9E9] flex flex-col p-[2px]">
                        {
                            items?.map((item, index) => (
                                <div className="flex cusor-pointer hover:text-[#FF5733] hover:bg-white py-[10px] px-[15px] sm:py-[20px] sm:px-[30px] animate-dissolve ease-out duration-300"
                                    key={index} 
                                    onClick={() => handleClick(item)}>
                                    <div className="lead-[21px] self-center">{item.title}</div>
                                </div>
                            ))
                        }
                    </div> : <></>
            }
            <div className="lead-[21px] self-center flex items-center gap-[10px]" onClick={() => setPopupFlag(true)}>
                <span> {item.title} </span>
                {popupFlag ? <ArrowUp /> : <ArrowDown />}
            </div>
        </div>
    )
}