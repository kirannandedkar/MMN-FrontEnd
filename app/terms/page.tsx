"use client";

import MMNContainer from "@/components/MMNContainer";
import { DefaultMemberFee } from "@/constants";
import TopNav from "@/components/TopNav";
import React from "react";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "Terms & Conditions", link: "#" },
];
const DescriptionItems = [
    { title: `Payment`, description: `At the checkout, you can pay with VISA/MASTERCARD and VIPPS. When you shop with a payment card at MaharashtraMandalNorway.no, the payment is processed by NETS/Netaxept, a secure electronic payment solution for Visa and MasterCard. All card information is stored in accordance with the card companies' regulations. All information you provide will be encrypted directly between you as a customer and our payment partner NETS/Netaxept. We use NETS' own checkout solution "Nets Easy".` },
    { title: `Prices`, description: `All prices are in Norwegian kroner and are shown including VAT.` },
    { title: `Personal information`, description: `MaharashtraMandalNorway.no processes personal data in accordance with the Personal Data Act. Information that can be linked to you as a person will never be made available to other businesses or linked with other external registers.` },
    { title: `Membership`, description: `MaharashtraMandalNorway is frivillig organisation registered in brønnøysundregisteret with org no 986 130 608. We dont sell any products. It is only possible to be members and membership per person is ${DefaultMemberFee} NOK per year.` },
    { title: `Contact information`, description: `For any question please email us at mmn@maharashtramandalnorway.no.` },
];

export default function TermsAndCondition() {
    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData} />
            <MMNContainer className="gap-[40px] pb-[40px] flex-col max-w-[1440px] m-auto">
                {
                    DescriptionItems.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="text-[18px] font-bold py-[10px]">
                                    {item.title}
                                </div>
                                <div className="">
                                    {item.description}
                                </div>
                            </div>

                        )
                    })
                }
            </MMNContainer>
        </div>

    )
}
