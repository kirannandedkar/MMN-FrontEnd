import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthResult } from "@/app/types/auth.types";

const handler = async (req: any) => {
    const session = await getServerSession(req);
    const req_body = await req.json();

    const result = await fetch(process.env.NEXT_PUBLIC_API_ENDPOIONT + "UserAccount/login-with-google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${req_body?.id_token}`,
        },
        body: null,
    });

    // console result to see what is returned
    if (result.status === 200) {
        const res_body = await result.json() as AuthResult;
        return handleSuccess(res_body);
    } else {
        return NextResponse.json({
            success: false,
            status: 400,
            message: "Sign in failed",
        });
    }
};


const handleSuccess = (res_body: AuthResult) => {
    const response = NextResponse.json({
        success: true,
        status: 200,
        message: "Sign in successful",
    });

    // add cookies to the response
    response.cookies.set("access_token", res_body.accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set("refresh_token", res_body.refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set("sub", res_body.sub, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    return response;
};
export { handler as POST };