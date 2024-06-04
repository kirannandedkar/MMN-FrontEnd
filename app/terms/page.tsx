"use client";

import MMNContainer from "@/components/MMNContainer";
import { DefaultMemberFee } from "@/constants";

const DescriptionItems = [
    { title: `Payment`, description: `At the checkout, you can pay with VISA/MASTERCARD and VIPPS. When you shop with a payment card at MaharashtraMandalNorway.no, the payment is processed by NETS/Netaxept, a secure electronic payment solution for Visa and MasterCard. All card information is stored in accordance with the card companies' regulations. All information you provide will be encrypted directly between you as a customer and our payment partner NETS/Netaxept. We use NETS' own checkout solution "Nets Easy".` },
    { title: `Prices`, description: `All prices are in Norwegian kroner and are shown including VAT.` },
    { title: `Personal information`, description: `MaharashtraMandalNorway.no processes personal data in accordance with the Personal Data Act. Information that can be linked to you as a person will never be made available to other businesses or linked with other external registers.` },
    { title: `Membership`, description: `MaharashtraMandalNorway is frivillig organisation registered in brønnøysundregisteret with org no 986 130 608. We dont sell any products. It is only possible to be members and membership per person is ${DefaultMemberFee} NOK per month.` },
    { title: `Contact information`, description: `For any question please email us at mmn@maharashtramandalnorway.no.` },
];

export default function TermsAndCondition() {
    return (
        <MMNContainer className="gap-[40px] py-[60px] flex-col max-w-[1440px] m-auto bg-[#F0F0F0]">
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
    )
}