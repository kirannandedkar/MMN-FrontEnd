'use client'

import MMNButton from "@/components/MMNButton";
import MMNTitle from "@/components/MMNTItle";

export default function PaymentCard({ memberCount = 1, MembershipFee = 0, processClicked, isSignedIn = false }: { memberCount?: number, MembershipFee:number, isSignedIn:boolean, processClicked: () => void }) {
    
    return (
        <div className="rounded-[10px] p-[24px] border border-color-mmn-lightgrey bg-mmn-red flex flex-col gap-[14px] text-white sm:w-1/2 w-full h-max min-w-max">
            <MMNTitle title="Total Payment" color="white" />

            <div className="grid grid-cols-2 line-height-mmn-large">
                <div>Total</div>
                <div className="font-bold text-[18px]">{`kr ${MembershipFee * memberCount}`}</div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1">
                <div onClick={isSignedIn ? processClicked : () => {}}>
                    <MMNButton title="Proceed payment" disabled={!isSignedIn} color="white" className={"min-w-max"}/>
                </div>
            </div>
        </div>
    )
}