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
        question: "How members can send suggestions and feedback for AGM agenda Q&A?",
        answer: "6-8 weeks prior to AGM, board of MMN will send google form to register suggestion and feedback for AGM agenda Q&A.",
    },
    {
        question: "When will be AGM arranged by MMN in each financial year?",
        answer: "AGM can be held every year or every second year around December.",
    },
    {
        question: "How AGM will be conducted in MMN?",
        answer: "AGM will be conducted either online or physically depending on situation.",
    },
    {
        question: "Where can i find the constitution?",
        answer: "You can find constitution under the menu AboutUs> MMN Constitution or by just clicking here https://maharashtramandalnorway.no/constitution.pdf",
    }, {
        question: "How members can send feedbacks and suggestions in general?",
        answer: "Members can fill the feedback form on our website in contact us menu. "
    }, {
        question: "What is yearly membership cost?",
        answer: "yearly membership is 160 NOK per person for all above 16 years."
    }    
    , {
        question: "Do you have half yearly or quarterly membership?",
        answer: "No as per now we have only yearly membership and we might think of having half yearly or quarterly membership in upcoming years"
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
