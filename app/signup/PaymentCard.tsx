'use client'

import MMNButton from "@/components/MMNButton";
import MMNTitle from "@/components/MMNTItle";

export default function PaymentCard({ memberCount = 1, MembershipFee = 0, processClicked }: { memberCount?: number, MembershipFee:number, processClicked: () => void }) {
    
    return (
        <div className="rounded-[10px] p-[24px] border border-color-mmn-lightgrey bg-mmn-red flex flex-col gap-[14px] text-white sm:w-1/2 w-full h-max min-w-max">
            <MMNTitle title="Total Payment" color="white" />

            <div className="grid grid-cols-2 line-height-mmn-large">
                <div>Total</div>
                <div className="font-bold text-[18px]">{`kr ${MembershipFee * memberCount}`}</div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1">
                <div onClick={processClicked}>
                    <MMNButton title="Proceed payment" color="white" className={"min-w-max"}/>
                </div>
            </div>
        </div>
    )
}