
const items = [
    { title: "FaceBook", link: "https://www.facebook.com/MMNoslo" },
    { title: "Youtube", link: "https://youtube.com/@maharashtramandalnorway" },
    { title: "Instagram", link: "https://www.instagram.com/maharashtramandalnorway?igsh=MTR4aW85NjU1dG5heQ==" },
];

export default function SocialLinkBar() {
    return (
        <div className="flex justify-center bg-[#EAEAEA]">
            <div className="w-full flex justify-end gap-4 px-[30px]">
                {
                    items.map((item, index) => (
                        <div className="rounded-[5px] p-[10px] text-size-mmn-small line-height-mmn-small" key={`sociallinksbar-${index}`}>
                            <a href={item.link} target="_blank">{item.title}</a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}