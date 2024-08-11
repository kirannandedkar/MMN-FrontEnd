"use client"

import MMNTitle from "@/components/MMNTItle";
import MMNPanel from "@/components/MMNPanel";
import MMNButton from "@/components/MMNButton";

export default function EventPane() {
    return (
        <MMNPanel className="bg-mmn-red">
            <MMNTitle title="Become a member" color="purple" />
            <div className="line-height-mmn-normal text-white">
                Price:
                <div className="inline text-red-500 bg-white mx-[8px] px-[8px] py-[4px] rounded-[3px]">kr 160</div>
                per member
            </div>

            <div className="line-height-mmn-large text-white">
                MMN Membership is valid for the calendar year, starting from January 1st and ending on December 31st. Regardless of when you join during the year, your membership will be active only until the end of December. 
                To continue enjoying the benefits of MMN Membership, renewal is required at the beginning of each new year.
            </div>

            <div className="flex justify-end">
                <MMNButton title="Become a member" color="white" />
            </div>
        </MMNPanel>
    )
}
