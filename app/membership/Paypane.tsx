"use client";

import MMNButton from "@/components/MMNButton";
import { useState } from "react";
import { FamilyAccountInfo } from "@/constants/types";
import TrashButton from "@/components/icons/trash";
import FamilyMemberModal from "./FamilyMemberModal";


interface Props {
    account?: FamilyAccountInfo,
}

const GetMemberLine = (member: FamilyAccountInfo, index: number, RemoveClick?: (id: number) => void) => {
    // const aaa = member.relation;
    return (
        <div className="py-[10px] flex justify-between items-center">
            <div> {`${member.firstName} ${member.lastName}`} </div>
            {
                member.relation == 'me' ? 
                    <div className="px-[10px] py-[6px] text-size-mmn-small line-height-mmn-small rounded-[6px] bg-[#F1F6FF]"> Primary member </div> : 
                    <div onClick={() => RemoveClick?.(index)}><TrashButton /></div> 
            }
        </div>
    )
}

export default function Paypane(params: Props) {

    const mainAccount = params.account as FamilyAccountInfo;
    const [familyAccounts, setFamilyAccounts] = useState<FamilyAccountInfo[]>([])
    const [price, setPrice] = useState<number>(0);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const RemoveClick = (index: number) => {
        setFamilyAccounts(prev => {
            prev.splice(index, 1);
            return [...prev];
        });
    }

    const handleAddMemberClick = () => {

    }

    const PayClicked = () => {

    }
    
    return (
        <>
            <div className="flex flex-col gap-[14px]">
                <div className={`flex flex-col gap-[5px]`}>
                    {
                        GetMemberLine(mainAccount, 0)
                    }

                    {
                        familyAccounts.map((account, index) => {
                            return <div key={index}>{GetMemberLine(account, index, RemoveClick)}</div>
                        })
                    }

                </div>
                <div onClick={() => setIsOpenModal(true)}>
                    <MMNButton title="+ Add family member" color="white" className={"w-full border-[1px] border-color-mmn-purple"} />
                </div>
                <div className="flex justify-between font-semibold text-color-mmn-purple items-center">
                    <div className="text-size-mmn-medium line-height-mmn-medium">
                        Total payment
                    </div>

                    <div className="text-size-mmn-extra line-height-mmn-extra">kr {price}</div>
                </div>

                <div className="flex justify-end">
                    <MMNButton title="Proceed to pay" color="purple" />
                </div>
            </div>
            <FamilyMemberModal open={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={(member) => setFamilyAccounts((prev) => ([...prev, member]))} />
        </>
    )
}