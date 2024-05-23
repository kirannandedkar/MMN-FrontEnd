"use client"

import MMNContainer from "@/components/MMNContainer";

import MMNTitle from "@/components/MMNTItle";

export default function BlogPane() {
    return (
        <div className="flex flex-col gap-[10px]">
            <MMNTitle title="Become a member" color="purple" />
            <div className="flex flex-col gap-[5px]">
                <div className="font-bold line-height-mmn-large">
                    Marathi Mandal Norway - Membership 2023
                </div>
                <div className="line-height-mmn-large">
                    This form is sent to you for the membership of Marathi Mandal Norway 2023.Please read this form carefully and fill in correct information and pay the applicable membership fee for your family.
                </div>
            </div>
        </div>
    )
}