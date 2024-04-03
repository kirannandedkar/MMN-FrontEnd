const data = [
    {
        title: "Quick links", items: [
            { title: "Become a member", link: "" },
            { title: "Become a volunteer", link: "" },
            { title: "FAQ", link: "" },
            { title: "Terms & Conditions", link: "" },
        ]
    },
    {
        title: "MMN Initiatives", items: [
            { title: "Marathi Shaala", link: "" },
        ]
    },
    {
        title: "Social Media", items: [
            { title: "Facebook", link: "" },
            { title: "Instagram", link: "" },
            { title: "Youtube", link: "" },
        ]
    },
    {
        title: "Reach us", items: [
            { title: "mmn@marathimandal-norway.no", link: "" },
        ]
    },
]

const GetSubItem = (title: string, subItmes: any[], key: number | string) => {
    return (
        <div className="flex flex-col gap-[10px] rounded-[5px]" key={`footer-first-${key}`}>
            <h3 className="font-semibold text-size-mmn-medium line-height-mmn-medium">{title}</h3>
            <div className="flex flex-col gap-[10px]">
                {
                    subItmes.map((item, index) => (
                        <span className="font-medium line-height-mmn-normal underline cursor-pointer" key={`footer-second-${index}`}> {item.title} </span>
                    ))
                }
            </div>
        </div>
    )
}
export default function FooterBar() {
    const RenderItem = data.map((item, index) => {
        return GetSubItem(item.title, item.items, index);
    });

    return (
        <div className="w-full py-[40px] border-t-[1px] border-color-mmn-lightgrey bg-[#F1F1F1] flex justify-center">
            <div className="w-full xl:px-[90px] sm:px-[40px] px-[20px] flex flex-wrap justify-between sm:gap-[40px] gap-[10px] max-w-[1440px]">
                {RenderItem}
            </div>
        </div>
    )
}