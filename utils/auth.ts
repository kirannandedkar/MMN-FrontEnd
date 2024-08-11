'use client'

import { AUTHPOST } from "./fetch-api";
import { getSession, signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { AuthResult } from "@/app/types/auth.types";
import { AccountInfo, FamilyAccountInfo } from "@/constants/types";
import { PhoneCode } from "@/constants";
import { toast } from "react-toastify";

const handleSignupByGoogle = async (member: AccountInfo | null, familyAccounts: (FamilyAccountInfo | null)[] = []) => {
  const session: any = await getSession();
  if (!session || !member)
    return false;
  const result = await AUTHPOST("UserAccount/create-user-with-google", {
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    gender: member.gender,
    referenceUserAccountId: null,
    muncipality: member.muncipality,
    phoneNumber: member.phoneNumber,
  }, {
    Authorization: `Bearer ${session?.id_token}`,
  });

  if (!result.isSuccess) {
    toast.error('Error Occurred.');
  } else {
    if (result.msg?.accessToken) {
      toast.success('Signup succeed.');
      return true;
    } else {
      if (result.msg?.Message) toast.error(result.msg?.Message);
    }
  }
  return false;
}

const handleSignupManually = async (member: AccountInfo | null, password: string, familyAccounts: (FamilyAccountInfo | null)[] = []) => {
  if (!member)
    return false;

  const result = await AUTHPOST("UserAccount/create-user", { ...member, password: password });

  if (!result.isSuccess) {
    toast.error('Error Occurred.');
  } else {
    toast.success('Email verification link sent.');
    return true;
    // if (result.msg?.accessToken) {
    //   handleCookie(result.msg as AuthResult);
    //   toast.success('Signup succeed.');
    //   return true;
    // } else {
    //   if (result.msg?.Message) toast.error(result.msg?.Message);
    // }
  }
  return false;
};

const handleEmailConfirm = (result: AuthResult) => {
   if (result?.accessToken) {
      handleCookie(result);
      return true;
    } else {
      toast.error('Login failed');
    }
    return false;
}

const handleSigninManual = async (email: string, password: string) => {
  const result = await AUTHPOST("UserAccount/login", { email, password });
  if (result !== null) {
    handleCookie(result as AuthResult);
  } else {
    toast.error("signing failed");
  }
};

const handleSigninGoogle = async () => {
  const session: any = await getSession();
  if (session) {
    const result = await AUTHPOST("UserAccount/login-with-google", null, {
      Authorization: `Bearer ${session?.id_token}`,
    });
    if (result !== null) {
      handleCookie(result);
    } else
      toast.error("signing failed google");
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

export { handleSignupManually, handleSignupByGoogle, handleSigninManual, handleSigninGoogle, handleEmailConfirm };
