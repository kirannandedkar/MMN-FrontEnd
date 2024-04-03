
const items = [
    { title: "FaceBook", link: "#" },
    { title: "Youtube", link: "#" },
    { title: "Instagram", link: "#" },
];

export default function SocialLinkBar() {
    return (
        <div className="flex justify-center bg-[#EAEAEA]">
            <div className="w-full flex justify-end gap-4 px-[30px] gap-[10px]">
                {
                    items.map((item, index) => (
                        <div className="rounded-[5px] p-[10px] text-size-mmn-small line-height-mmn-small" key={`sociallinksbar-${index}`}>
                            <a href={item.link}>{item.title}</a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}