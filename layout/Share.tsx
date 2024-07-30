
export interface MenuItem {
    title: string,
    link: string,
    icon?: any,
    href?: string,
    subItems?: MenuItem[]
}
export const menuItemData = [
    { title: "Home", link: "/home" },
    {
        title: "About us",
        link: "/aboutus",
        subItems: [
            { title: "Mission and Vision", link: "/mission-vision" },
            { title: "MMN History", link: "/history" },
            { title: "MMN Constitution", link: "", href: "/constitution.pdf"},
            { title: "Committee Members", link: "/committeemember" },
            { title: "Become a MMN member", link: "" },
        ]
    },
    { title: "Membership", link: "/membership" },
    { title: "Event", link: "/events" },
    { title: "Gallery", link: "" },
    { 
        title: "MMN Initiatives", 
        link: "/initiative",
        subItems: [
            { title: "MarathiBoli Shaala", link: "/marathiboli-shaala" },
            { title: "Grants", link: "/grants" }
        ]
    },
    { title: "Contact us", link: "" }
]
