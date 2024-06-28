"use client";

import React, {useEffect} from 'react';
import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import {GET} from "@/utils/fetch-factory";
import {toast} from "react-toastify";

const completePage = () => {
    const [loading, setLoading] = React.useState(false);
    const [paidAmount, setPaidAmount] = React.useState(0);
    const [familyMember, setFamilyMember] = React.useState<number>(0);
    useEffect(() => {
        const fetchData = async () =>{
            const familyMembers = await GET("/proxy/family-members");
            if(familyMembers && familyMembers.length > 0){
                const fetchSubscription = await GET("/proxy/subscription-plan");
                if(fetchSubscription){
                    const perPerson = fetchSubscription.price / 100;
                    const totalMember = familyMembers.length;
                    setFamilyMember(totalMember);
                    setPaidAmount(((totalMember + 1) * perPerson))
                    setLoading(false)
                }else{
                    toast.error("Something went wrong");
                    setLoading(false)
                }
            }else{
                setLoading(false)
                toast.error("Something went wrong");
            }
        }
        fetchData();
    }, []);

    const NavData = [
        { title: "Home", link: "/home" },
        { title: "Payment", link: "#" },
        { title: "Payment Complete", link: "#" },
    ];

    if (loading)
        return <p>Loading...</p>
    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData}/>
            <MMNContainer className="gap-[40px] pb-[40px] flex-col sm:flex-row">
                <div className="flex flex-col gap-[20px] grow-[2]">
                    <div className="text-[24px] leeading-[36px] font-semibold text-red-500">
                        {`🎉 Congratulations!`}
                    </div>
                    <div className="rounded-[8px] p-[10px] bg-[#FFEFEC] text-[14px] leading-[28px]">
                        <span>{`You have successfully paid ${paidAmount} with ${familyMember} family mebers, now you are subscribed.`} </span>
                    </div>
                </div>
            </MMNContainer>
        </div>
    );
};

export default completePage;