import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthResult } from "@/app/types/auth.types";

const handler = async (req: any) => {
  const req_body = await req.json();
  const session = await getServerSession(req);
  const request = {
    firstName: req_body.firstName,
    lastName: req_body.lastName,
    email: req_body.email,
    password: req_body.password,
    gender: req.gender,
    muncipality: req_body.country,
    phoneNumber: req_body.mobile,
  };

  const result = await fetch(process.env.NEXT_PUBLIC_API_ENDPOIONT +"UserAccount/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  // console result to see what is returned
    console.log(result.status);

  if (result.status === 200) {
    

    if (result.status === 200) {
        const res_body = (await result.json()) as AuthResult;
        return handleSuccess(res_body);
    } else {
        return NextResponse.json({
            success: false,
            status: 400,
            message: "Sign up failed",
        });
    }
  } else {
    return NextResponse.json({
      success: false,
      status: 400,
      message: "Sign up failed",
    });
  }
};

const handleSuccess = (res_body: AuthResult) => {
    const response = NextResponse.json({
        success: true,
        status: 200,
        message: "Sign up successful",
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
