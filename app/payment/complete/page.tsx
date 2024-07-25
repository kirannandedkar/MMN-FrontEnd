"use client";

import React, {useEffect} from 'react';
import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import {GET} from "@/utils/fetch-factory";
import {toast} from "react-toastify";
import Loader from "@/components/Loader";
import {useSelector} from "react-redux";
import Error from "@/components/Error";

const completePage = () => {
    const [loading, setLoading] = React.useState(false);
    const [paidAmount, setPaidAmount] = React.useState(0);
    const [familyMember, setFamilyMember] = React.useState<number>(1);
    const { authresult } = useSelector((state: any) => state.auth);

    useEffect(() => {
        const fetchData = async () =>{
            debugger;
            const familyMembers = await GET("/proxy/family-members");
            if(familyMembers && familyMembers.length > 0){
                const totalMember = familyMembers.length + 1;
                setFamilyMember(totalMember);
            }else{
                toast.error("Something went wrong");
            }

            const fetchSubscription = await GET("/proxy/subscription-plan");
            if(fetchSubscription){
                const perPerson = fetchSubscription.price / 100;
                setPaidAmount(familyMember * perPerson)
            }else{
                toast.error("Something went wrong");
            }
            setLoading(false)
        }
        if(authresult){
            fetchData();
        }

    }, []);

    const NavData = [
        { title: "Home", link: "/home" },
        { title: "Payment", link: "#" },
        { title: "Payment Complete", link: "#" },
    ];

    if (!authresult)
        return <Error/>;

    if (loading)
        return <Loader/>

    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData}/>
            <MMNContainer className="gap-[40px] pb-[40px] flex-col sm:flex-row">
                <div className="flex flex-col gap-[20px] grow-[2]">
                    {/*<div className="text-[24px] leeading-[36px] font-semibold text-red-500">*/}
                    {/*    {`🎉 Congratulations!`}*/}
                    {/*</div>*/}
                    <div className="rounded-[8px] p-[10px] bg-[#FFEFEC] text-[14px] leading-[28px]">
                        <span>{`You have successfully paid ${paidAmount} with ${familyMember} family members, now you are subscribed.`} </span>
                    </div>
                </div>
            </MMNContainer>
        </div>
    );
};

export default completePage;