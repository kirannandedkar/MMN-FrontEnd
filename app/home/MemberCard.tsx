"use client";

import MMNTitle from "@/components/MMNTItle";
import MMNPanel from "@/components/MMNPanel";
import MMNButton from "@/components/MMNButton";
import { useEffect, useState } from "react";
import { GET } from "@/utils/fetch-factory";
import SectionLoader from "@/components/SectionLoader";

const MemberCard = () => {
    const [loading, setLoading] = useState(true);
    const [membershipFee, setMembershipFee] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { price } = await GET("/proxy/subscription-plan");
            setMembershipFee(price / 100);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <SectionLoader />;

    return (
        <MMNPanel className="bg-mmn-red">
            <MMNTitle title="Become a member" color="white" />
            <div className="line-height-mmn-normal text-white">
                Fee:
                <div className="inline text-red-500 bg-white mx-[8px] px-[8px] py-[4px] rounded-[3px]">
                    kr {membershipFee}
                </div>
                per member
            </div>

            <div className="line-height-mmn-large text-white">
                MMN Membership is valid for the calendar year, starting from January 1st and ending on December 31st. Regardless of when you join during the year, your membership will be active only until the end of December.
                To continue enjoying the benefits of MMN Membership, renewal is required at the beginning of each new year.
            </div>

            <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfWIaKeroUz8KEvr9ImpezojBq7DiEWx5GGZVMcBh0mjd-tMA/viewform?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-end mt-4"
            >
                <MMNButton title="Become a member" color="white" />
            </a>
        </MMNPanel>
    );
};

export default MemberCard;
