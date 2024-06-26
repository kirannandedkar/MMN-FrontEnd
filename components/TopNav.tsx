"use client";

import { useRouter } from "next/navigation";
import MMNContainer from "./MMNContainer";
import {useSelector} from "react-redux";


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
    const router = useRouter();

    const count: number = itemList.length;
    const { authresult } = useSelector((state: any) => state.auth);

    return (
        <MMNContainer>
            <div className="py-[40px] flex gap-[10px] flex-wrap">
                {
                    itemList.map((item: Item, index) => {
                        if (index == count - 1) {
                            return <span key={`topnav-${index}`}>
                                {item.title}
                            </span>
                        } else {
                            return <span key={`topnav-${index}`}>
                                <a className="text-color-mmn-yellow underline" href="#" onClick={() => router.push(item.link)}>
                                    {`${item.title}`}
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