'use client'
import Cookies from 'js-cookie';

const fetchData = async (url: string, method: string, req_body: any, customHeaders: any, auth: boolean = true) => {
    const access_token = Cookies.get('access_token');
    const authHeader = auth ? { Authorization: `Bearer ${access_token}`, } : {};

    const options = {
        method: method,
        headers: {
            ...authHeader,
            "Content-Type": "application/json",
            ...customHeaders
        },
        body: req_body ? JSON.stringify(req_body) : null,
    };

    try {
        const response = await fetch(url, options);
        const responseData = await response.json();

        if ((responseData?.IsSuccess != undefined && responseData?.IsSuccess === false) || (responseData?.status != undefined && responseData?.status !== 200)) {
            console.error(`Failed: ${url}`, responseData.Message);
            return null;
        }
        return responseData;
    } catch (error) {
        console.error(`Error: ${url}`, error);
    }
    return null;
}

const APIPOST = async (url: string, req_body: any = {}, headers = {}) => await fetchData(process.env.NEXT_PUBLIC_API_ENDPOIONT + url, 'POST', req_body, headers);
const AUTHPOST = async (url: string, req_body: any = {}, headers = {}) => await fetchData(process.env.NEXT_PUBLIC_API_ENDPOIONT + url, 'POST', req_body, headers, false);

const APIGET = async (url: string, headers = {}) => await fetchData(process.env.NEXT_PUBLIC_API_ENDPOIONT + url, 'GET', null, headers);
const AUTHGET = async (url: string, headers = {}) => await fetchData(process.env.NEXT_PUBLIC_API_ENDPOIONT + url, 'GET', null, headers, false);

export { APIPOST, APIGET, AUTHPOST, AUTHGET };
