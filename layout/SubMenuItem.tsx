"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Item {
    title: string,
    link: string,
}

interface Props {
    item: {
        title: string, link: string, subItems: Item[]
    },
    callback?: Function
}

export default function SubMenuItem({ item }: Props) {
    const router = useRouter();
    const pathName = usePathname();

    const [popupFlag, setPopupFlag] = useState(false);

    const items = item.subItems;
    const title = item.title;
    const parentPath = item.link;

    const [link, setLink] = useState<string>("");
    useEffect(() => {
        setLink(pathName);
    }, [pathName]);

    const handleClick = (subItem:Item) => {
        if(subItem.link)
            router.push(parentPath + subItem.link);
        setPopupFlag(false);
    }
    
    return (
        <div className={`flex relative px-[30px] py-[15px] border-b-[2px] rounded-b-[6px] cursor-pointer z-[100]
        ${ item.link && link.startsWith(item.link) ? "text-white bg-mmn-red border-[#FFC5B9]" : "bg-white border-white" }`}
            onMouseOver={e => setPopupFlag(true)}
            onMouseLeave={e => setPopupFlag(false)}
        >
            <div className="line-height-mmn-normal self-center flex gap-[6px]">
                <span> {title} </span>
                <span> {popupFlag ? "▲" : "▼"} </span>
            </div>

            {
                popupFlag ?
                    <div className="absolute top-[83px] left-[5px] w-max border-b-[2px] rounded-b-[6px] border-[#808080] border-b-[2px] bg-[#ECE9E9] flex flex-col p-[2px]">
                        {
                            items?.map((item, index) => (
                                <div className="flex cusor-pointer hover:text-color-mmn-yellow hover:bg-white p-[20px] animate-dissolve ease-out duration-300"
                                    key={index} onClick={() => handleClick(item) }>
                                    <div className="lead-[21px] self-center">{item.title}</div>
                                </div>
                            ))
                        }
                    </div> : <></>
            }
        </div>
    )
}