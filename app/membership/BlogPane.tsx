"use client"

import MMNTitle from "@/components/MMNTItle";
import { AccountInfo } from "@/constants/types";

interface BlogPaneProps {
    fullName?: string,
    signed?: boolean,
    familyMemberNotAdded?: boolean,
    notPaid?: boolean
}

export default function BlogPane({ fullName, signed, familyMemberNotAdded, notPaid }: BlogPaneProps) {
    let message = null;
    if (signed && familyMemberNotAdded) {
        message = <div className="rounded-[8px] p-[10px] bg-[#FFEFEC] text-[14px] leading-[28px]"><span>{`To complete your registration, you'll need to add your family information. This step is necessary to finalize the process.`} </span></div>;
    }else if (signed && notPaid) {
        message = <div className="rounded-[8px] p-[10px] bg-[#FFEFEC] text-[14px] leading-[28px]"><span>{`To complete the registration process, payment is necessary. This ensures your registration is finalized and allows you to access all the associated benefits and services. Please proceed with the payment to continue with your registration successfully.`} </span></div>;
    }else {
        message = <div className="rounded-[8px] p-[10px] bg-[#FFEFEC] text-[14px] leading-[28px]"><span>{`You have successfully signed up. In order to complete`} </span><span className="font-bold">{` the MMN membership `}</span><span>{`registration process, please add below required details, family members information (if any) and complete the payment.`}</span> </div>
    }
    return (
        <div className="flex flex-col gap-[10px]">
            <MMNTitle title="Become a member" color="purple"/>
            <div className="flex flex-col gap-[10px]">
                <div className="font-bold line-height-mmn-large">
                    Maharashtra Mandal Norway - Membership 2025
                </div>
                {
                    signed ? (
                        <div className="flex flex-col gap-[10px]">
                            <div className="text-[24px] leeading-[36px] font-semibold text-red-500">
                                {`🎉 Congratulations! ${fullName || ''}`}
                            </div>

                            {message}
                        </div>
                    ) : (
                        <div className="line-height-mmn-large">
                            This form is sent to you for the membership of Maharashtra Mandal Norway 2025.Please read this form carefully and fill in correct information and pay the applicable membership fee for your family.
                        </div>
                    )
                }
            </div>
        </div >
    )
}
