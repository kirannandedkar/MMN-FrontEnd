"use client"

import MMNButton from "@/components/MMNButton";

import MMNTitle from "@/components/MMNTItle";
import { useState, useEffect } from "react";
import Paypane from "./Paypane";
import { FamilyAccountInfo } from "@/constants/types";
import { GET } from "@/utils/fetch-factory";
import SectionLoader from "@/components/SectionLoader";

interface Props {
    className?: string,
}

const defUser: FamilyAccountInfo = {
    id: '',
    firstName: "Alex",
    lastName: "Bilakh",
    dateOfBirth: "2001-3-14",
    email: "alex@gmail.com",
    gender: 'male',
    relation: 'me',
    memberid: 'FKEFOEFLKE@@#()($DFWE',
}

export default function RenewMemberCard(params: Props) {
    const [accountID, setAccountID] = useState<string>("1234567890");
    const [account, setAccount] = useState<FamilyAccountInfo>();
    const [loading, setLoading] = useState(true);
    const [membershipFee, setMembershipFee ] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const {price} = await GET("/proxy/subscription-plan");
            setMembershipFee(price / 100);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleRenewNowClick = () => {
        if (accountID == "" || accountID == undefined)
            return;

        setAccount(defUser);
    }

    if(loading)
        return <SectionLoader/>

    return (
        <div className={`flex flex-col p-[24px] gap-[14px] rounded-[10px] border-[1px] border-color-mmn-lightgrey h-max ${params.className || ""}`}>
            <MMNTitle title="Renew membership?" color="purple" />
            <div className="flex flex-wrap gap-[10px]">
                <span>Price:</span>
                <span className="font-semibold">{` kr ${membershipFee}`}</span>
                <span>per member</span>
            </div>

            <div className="italic line-height-mmn-large">
                <span>To renew your membership, please enter your</span>
                <span className="font-bold">{" Member ID"}</span>
                <span>{" or "}</span>
                <span className="font-bold">Registered Email ID</span>
            </div>

            <div className="flex flex-col gap-[5px]">
                <div>{"Member id/Email id *"}</div>
                <input type="text" className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                    placeholder="Enter member ID"
                    value={accountID}
                    onChange={e => setAccountID(e.target.value)}
                />
            </div>

            {
                account == undefined ?
                    <div className="flex justify-end" onClick={handleRenewNowClick}>
                        <MMNButton title="Renew membership now" color="purple" className={"w-full sm:w-max"}/>
                    </div>
                    : <Paypane account={account}/>
            }
        </div>
    )
}