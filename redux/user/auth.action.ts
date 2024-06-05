'use client'

import { AuthResult } from "@/app/types";
import { APIGET, APIPOST, AUTHPOST } from "@/utils/fetch-api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getSession, signIn } from "next-auth/react";

export const SignInManualy = createAsyncThunk(
    "user/manualsignin",
    async ({ email, password }: { email: string, password: string }, { getState, rejectWithValue }) => {
        const result = await AUTHPOST("UserAccount/login", { email, password });

        if (result !== null) {
            return result;
        } else {
            return rejectWithValue("signin manually failed");
        }
    }
);

export const SignInGoogle = createAsyncThunk(
    "user/googlesignin",
    async (_, { getState, rejectWithValue }) => {
        const session: any = await getSession();
        if (session) {
            const result = await AUTHPOST("UserAccount/login-with-google", null, { Authorization: `Bearer ${session?.id_token}`, });
            return result !== null ? result : rejectWithValue("signin google failed");
        } else {
            signIn('google');
            return rejectWithValue("session is empty");;
        }
    }
);

export const GetSubscription = createAsyncThunk(
    "user/subscription",
    async (_, { getState, rejectWithValue }) => {
        const result = await APIGET("User/subscription");
        return result !== null ? result : rejectWithValue("Failed to load subscription");
    }
);
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