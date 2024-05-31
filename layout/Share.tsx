
export interface MenuItem {
    title: string,
    link: string,
    href?: string,
    subItems?: MenuItem[]
}
export const menuItemData = [
    { title: "Home", link: "/home" },
    {
        title: "About us",
        link: "/aboutus",
        subItems: [
            { title: "Mission and Vision", link: "" },
            { title: "MMN History", link: "" },
            { title: "MMN Constitution", link: "", href: "/constitution.pdf"},
            { title: "Committee Members", link: "/committeemember" },
            { title: "Become a MMN member", link: "" },
        ]
    },
    { title: "MemberShip", link: "/membership" },
    { title: "Event", link: "" },
    { title: "Gallery", link: "" },
    { title: "MMN Initiatives", link: "" },
    { title: "Contact us", link: "" },
]
