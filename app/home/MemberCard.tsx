"use client";

import MMNTitle from "@/components/MMNTItle";
import MMNPanel from "@/components/MMNPanel";
import MMNButton from "@/components/MMNButton";
import { useRouter } from "next/navigation";

export default function MemberCard(){
    const router = useRouter();

    return (
        <MMNPanel className="bg-mmn-red">
            <MMNTitle title="Become a member" color="white" />
            <div className="line-height-mmn-normal text-white">
                Price: 
                <div className="inline text-red-500 bg-white mx-[8px] px-[8px] py-[4px] rounded-[3px]">kr 150</div>
                per member
            </div>

            <div className="line-height-mmn-large text-white">
            MMN Membership goes from January to December of each year. Do check our membership benefits and join us.
            </div>

            <div className="flex justify-end" onClick={ () => router.push("/membership")}>
                <MMNButton title="Become a member" color="white" />
            </div>
        </MMNPanel>
    )
}