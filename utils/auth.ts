import { AUTHPOST } from "./fetch-api";
import { getSession, signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { AuthResult } from "@/app/types/auth.types";
import { AccountInfo, FamilyAccountInfo } from "@/constants/types";

const handleSignupByGoogle = async (member: AccountInfo | null, familyAccounts: (FamilyAccountInfo | null)[] = []) => {
  const session: any = await getSession();
  if (!session || !member)
    return false;

  const result = await AUTHPOST("UserAccount/create-user-with-google", {
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    gender: member.gender,
    referenceUserAccountId: 0,
    muncipality: member.muncipality,
    phoneNumber: member.mobile
  }, {
    Authorization: `Bearer ${session?.id_token}`,
  });

  if (result !== null) {
    alert("signup successful google");
    return true;
  } else {
    alert("signup failed");
    return false
  }
}

const handleSignupManually = async (member: AccountInfo | null, password: string, familyAccounts: (FamilyAccountInfo | null)[] = []) => {
  if (!member)
    return false;

  const result = await AUTHPOST("UserAccount/create-user", { ...member, password: password });
  if (result !== null) {
    handleCookie(result as AuthResult);
    alert("signup successful manually");
    return true;
  } else {
    alert("signup failed");
    return false;
  }
};

const handleSigninManual = async (email: string, password: string) => {
  const result = await AUTHPOST("UserAccount/login", { email, password });
  if (result !== null) {
    handleCookie(result as AuthResult);
    alert("signin successful manually");
  } else {
    alert("signin failed");
  }
};

const handleSigninGoogle = async () => {
  const session: any = await getSession();
  console.log("session is ", session);
  if (session) {
    const result = await AUTHPOST("UserAccount/login-with-google", null, {
      Authorization: `Bearer ${session?.id_token}`,
    });
    if (result !== null) {
      handleCookie(result);
      alert("signin successful google");
    } else
      alert("signin failed google");
  } else signIn('google');
};


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

export { handleSignupManually, handleSignupByGoogle, handleSigninManual, handleSigninGoogle };
