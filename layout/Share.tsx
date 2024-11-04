
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
            //{ title: "Become a MMN member", link: "" },
        ]
    },
    { title: "Membership", link: "/membership" },
    { title: "Event", link: "/events" },
    { title: "Gallery", link: "/gallery" },
    { 
        title: "Diwali Magazine", 
        link: "/diwali-magazine",
        subItems: [
            { title: "Magazine 1", link: "/magazine-1" },
            { title: "Magazine 2", link: "/magazine-2" },
            { title: "Magazine 3", link: "/magazine-3" },
            { title: "Magazine 4", link: "/magazine-4" },
            { title: "Magazine 5", link: "/magazine-5" },
            { title: "Magazine 6", link: "/magazine-6" }
        ]
    },
    { 
        title: "MMN Initiatives", 
        link: "/initiative",
        subItems: [
            { title: "MarathiBoli Shaala", link: "/marathiboli-shaala" },
            { title: "Grants", link: "/grants" }
        ]
    },
    { title: "Contact us", link: "/contact-us" }
]
