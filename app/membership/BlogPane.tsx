"use client"

import MMNTitle from "@/components/MMNTItle";
import { AccountInfo } from "@/constants/types";

interface BlogPaneProps {
    member?: AccountInfo | null,
    signed?: boolean
}

export default function BlogPane({ member, signed }: BlogPaneProps) {
    return (
        <div className="flex flex-col gap-[10px]">
            <MMNTitle title="Become a member" color="purple" />
            <div className="flex flex-col gap-[10px]">
                <div className="font-bold line-height-mmn-large">
                    Marathi Mandal Norway - Membership 2023
                </div>
                {
                    signed ? (
                        <div className="flex flex-col gap-[10px]">
                            <div className="text-[24px] leeading-[36px] font-semibold text-red-500">
                                {`🎉 Congratulations! ${member?.firstName || ''} ${member?.lastName || ''}`}
                            </div>

                            <div className="rounded-[8px] p-[10px] bg-[#FFEFEC] text-[14px] leading-[28px]">
                                <span>{`You have successfully signed up. In order to complete`} </span> 
                                <span className="font-bold">{` the MMN membership `}</span> 
                                <span>{`registration process, please add below required details, family members information (if any) and complete the payment.`}</span> 
                            </div>
                        </div>
                    ) : (
                        <div className="line-height-mmn-large">
                            This form is sent to you for the membership of Marathi Mandal Norway 2023.Please read this form carefully and fill in correct information and pay the applicable membership fee for your family.
                        </div>
                    )
                }
            </div>
        </div >
    )
}