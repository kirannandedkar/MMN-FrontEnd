"use client";

import MMNButton from "@/components/MMNButton";
import { useState } from "react";
import { AccountInfo, FamilyAccountInfo } from "@/constants/types";
import FamilyMemberModal from "./FamilyMemberModal";
import TrashButton from "@/components/icons/trash";
import { APIPOST } from "@/utils/fetch-api";
import { useRouter } from "next/navigation";
import { DefaultMemberFee } from "@/constants";

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
                    <div onClick={() => RemoveClick?.(index)}><TrashButton fill="black" /></div>
            }
        </div>
    )
}

export default function Paypane(params: Props) {
    const router = useRouter();
    const mainAccount = params.account as FamilyAccountInfo;
    const [familyAccounts, setFamilyAccounts] = useState<FamilyAccountInfo[]>([])
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const RemoveClick = (index: number) => {
        setFamilyAccounts(prev => {
            prev.splice(index, 1);
            return [...prev];
        });
    }
    const AddClicked = (member: FamilyAccountInfo) => setFamilyAccounts((prev) => ([...prev, member]));

    const onPayClicked = async () => {
        router.push('payment/checkout');
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
                            return <div key={`paypane-${index}`}>{GetMemberLine(account, index, RemoveClick)}</div>
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

                    <div className="text-size-mmn-extra line-height-mmn-extra">kr {(familyAccounts.length + 1) * DefaultMemberFee}</div>
                </div>

                <div className="flex justify-end">
                    <div onClick={onPayClicked}>
                        <MMNButton title="Proceed to pay" color="purple" />
                    </div>
                </div>
            </div>
            <FamilyMemberModal open={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={AddClicked} />
        </>
    )
}