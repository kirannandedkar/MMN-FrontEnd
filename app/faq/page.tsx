import React from 'react';
import MMNContainer from "@/components/MMNContainer";
import TopNav from "@/components/TopNav";
import FaqPane from "@/app/faq/FaqPane";

const NavData = [
    { title: "Home", link: "/home" },
    { title: "FAQ", link: "#" },
];
const faqs = [
    {
        question: "What do you mean by \"Figma assets\"?",
        answer: "You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.",
    },
    {
        question: "What do you mean by \"Figma assets\"?",
        answer: "You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.",
    },
    {
        question: "What do you mean by \"Figma assets\"?",
        answer: "You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.",
    },
    {
        question: "What do you mean by \"Figma assets\"?",
        answer: "You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.",
    }, {
        question: "What do you mean by \"Figma assets\"?",
        answer: "You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.",
    }, {
        question: "What do you mean by \"Figma assets\"?",
        answer: "You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.",
    }
]

const FaqPage = () => {
    return (
        <div className="max-w-[1440px] m-auto">
            <TopNav itemList={NavData}/>
            <MMNContainer className="gap-[40px] pb-[40px] lg:flex-row flex-col">
                <div className="grid md:gap-16 md:grid-cols-2">
                    {faqs.map((faq, index) => (
                        <FaqPane
                            key={index}
                            answer={faq.answer}
                            question={faq.question}
                        />
                    ))}
                </div>
            </MMNContainer>
        </div>
    );
};

export default FaqPage;