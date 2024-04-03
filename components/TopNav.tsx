"use client";

import { useRouter } from "next/navigation";
import MMNContainer from "./MMNContainer";

interface Item {
    title: string,
    link: string
}

interface Props{
    itemList?: Item[]
}

export default function TopNav(params: Props) {
    const itemList = params.itemList;
    if(itemList == undefined) return null;

    const count: number = itemList.length;

    return (
        <MMNContainer>
            <div className="py-[40px] flex gap-[10px]">
                {
                    itemList.map((item: Item, index) => {
                        if (index == count - 1) {
                            return <span key={`topnav-${index}`}>
                                {item.title}
                            </span>
                        } else {
                            return <span key={`topnav-${index}`}>
                                <a className="text-color-mmn-yellow underline" href={item.link}>
                                    {item.title}
                                </a>
                                <span>{" > "}</span>
                            </span>
                        }
                    })
                }
            </div>
        </MMNContainer>
    )
}