import { AuthResult } from "@/app/types";
import Cookies from "js-cookie";

const handleCookie = (res_body: AuthResult) => {
    // add cookies to the response
    const option: Cookies.CookieAttributes = {
        path: "/",
        expires: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    };

    Cookies.set("access_token", res_body.accessToken, option);
    Cookies.set("refresh_token", res_body.refreshToken, option);
    Cookies.set("sub", res_body.sub, option);
};


const initCookie = () => {
    Cookies.set("access_token", '');
    Cookies.set("refresh_token", '');
    Cookies.set("sub", '');
}

const isOlder18 = (birth: string | undefined) => {
    if (!birth)
        return false;
    return ((Date.now() - Date.parse(birth)) / 1000) > (18 * 365 * 24 * 60 * 60);
}

export { isOlder18, handleCookie, initCookie }