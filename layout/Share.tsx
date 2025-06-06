
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
            { title: "Grants", link: "/grants" }
        ]
    },
    { title: "Membership", link: "/membership" },
    { title: "Event", link: "/events" },
    { title: "Gallery", link: "/gallery" },
    { title: "Diwali Magazine", link: "/diwali-magazine" },
   
    { 
        title: "MMN Initiatives", 
        link: "/initiative",
        subItems: [
            //{ title: "MarathiBoli Shaala", link: "/marathiboli-shaala" },
            //{ title: "Grants", link: "/grants" }
        ]
    },
    { title: "Contact us", link: "/contact-us" }
]
