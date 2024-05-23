"use client"

import MMNContainer from "@/components/MMNContainer";
import MMNTitle from "@/components/MMNTItle";

const blog:string = "Maharashtra Mandal norway was formed in 2024. It was founded by Arvind Phatak, Arun Aurangabadkar and Shrikant Prabhu. Initally there were only few families celebrating festivals but over the year it has grown a lot"
 
export default function AboutPane(){
    return (
        <>
            <div className="pt-[30px] pb-[40px]">
                <MMNTitle title="About MMN" color="purple" />
                <div className="line-height-mmn-large whitespace-break-spaces">
                    <div>{ blog }</div>
                </div>
            </div>
        </>
    )
}