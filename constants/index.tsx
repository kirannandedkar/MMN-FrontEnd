const defaultPageTitle = "Marathi Mandal Norway";

export const GetPageTitle = (subTitle: string) => {
    return defaultPageTitle + " - " + subTitle;
}

export const FavIcon = [
    { rel: 'icon', url: '/favicon.png' },
];