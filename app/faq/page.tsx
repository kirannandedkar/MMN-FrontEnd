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
        question: "Will the non members do not get an invitation for upcoming events",
        answer: "Everyone will get invitation to upcoming events if you are registered in our google group. You can do so by sending email to our committe at mmn@marathimandalnorway.no . You can also be part of whatsapp group by sending your no to said email",
    },
    {
        question: "When are AGM (Annual general meetings) held?",
        answer: "AGM are held every 2 years.",
    },
    {
        question: "Is AGM online or physically held?",
        answer: "If we get place then we will held it physically otherwise will be online.",
    },
    {
        question: "Where can i find the constitution?",
        answer: "You can find constitution under the menu AboutUs> MMN Constitution or by just clicking here https://maharashtramandalnorway.no/constitution.pdf",
    }, {
        question: "Where can i ask if we have any general questions. Do you have any open forum?",
        answer: "You can ask questions during Annual general meeting or you can send email to mmn@marathimandalnorway.no . Apart from it there is no open forum. This is because we are frivillig organisation. Every Organisation always ask their paid members to contact on organisation mail Id for their open question doubts suggestion feedbacks.For eg. Turn forening, swimming, any Gym members has to ask questions by sending email to support. "
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
