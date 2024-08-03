"use client"
import React, {useEffect, useState} from 'react';
import TopNav from "@/components/TopNav";
import MMNContainer from "@/components/MMNContainer";
import FamilyInfo from "@/app/auth/membership-details/FamilyInfo";
import {GET} from "@/utils/fetch-factory";
import {AccountInfo, FamilyAccountInfo} from "@/constants/types";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import Loader from "@/components/Loader";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Auth", link: "#" },
    { title: "Membership-details", link: "#" }
];

const Page = () => {

    const router = useRouter();
    const [userInfo, setUserInfo] = useState<AccountInfo|null>(null);
    const [familyMembers, setFamilyMembers] = useState<FamilyAccountInfo[]>([])
    const [loading, setLoading] = useState(true);
    const { authresult } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (!authresult) {
            router.push('/home');
        }
    }, [authresult]);

    useEffect(() => {
        const fetchData = async () => {
            const userInfo = await GET('/proxy/user/me');
            const familyMembers = await GET("/proxy/family-members");
            setUserInfo(userInfo);
            setFamilyMembers(familyMembers);
            setLoading(false);
        }
        if(authresult)
            fetchData();

    }, []);

    if(loading)
        return <Loader></Loader>
    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData}/>
            <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
                <div className="flex flex-col gap-[20px] grow-[2]">

                    <div className="flex flex-col gap-[10px] line-height-mmn-large">
                        <div className="font-bold">{"Primary member information"}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] ">
                            <div>
                                <div className="pb-[5px]">First name</div>
                                <input
                                    type="text"
                                    className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                    placeholder="Enter First Name"
                                    disabled={true}
                                    value={userInfo?.firstName}
                                />
                            </div>

                            <div>
                                <div className="pb-[5px]">Last name</div>
                                <input
                                    type="text"
                                    className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                    placeholder="Enter Last Name"
                                    disabled={true}
                                    value={userInfo?.lastName}
                                />
                            </div>

                            <div>
                                <div className="pb-[5px]">Email id*</div>
                                <input
                                    type="text"
                                    className="px-[14px] py-[16px] border-[1px] border-color-mmn-grey rounded-[6px] line-height-mmn-medium w-full"
                                    placeholder="email@email.no"
                                    disabled={true}
                                    value={userInfo?.email}
                                />
                            </div>
                        </div>
                    </div>

                    {familyMembers.length > 0 ? <div className="line-height-mmn-large font-bold">Family members</div> : ''}

                    {
                        familyMembers.map((account, index) => {
                            return (
                                <FamilyInfo
                                    key={index}
                                    account={account}
                                />
                            )
                        })
                    }
                </div>
            </MMNContainer>
        </div>
    );
};

export default Page;