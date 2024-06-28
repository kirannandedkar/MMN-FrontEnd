'use client'

import { APIGET, APIPOST, AUTHPOST } from "@/utils/fetch-api";
import {clearCookie, handleCookie} from "@/utils/funcs";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getSession, signIn, signOut } from "next-auth/react";

export const SignInManualy = createAsyncThunk(
    "user/manualsignin",
    async ({ email, password }: { email: string, password: string }, { getState, rejectWithValue }) => {
        const result = await AUTHPOST("UserAccount/login", { email, password });
        if (!result.isSuccess) {
            return rejectWithValue('Error Occured.');
        } else {
            if (result.msg?.accessToken) {
                handleCookie(result.msg);
                return result.msg;
            } else {
                if (result.msg?.Message)
                    return rejectWithValue(result.msg?.Message);
            }
        }
    }
);

export const SignInGoogle = createAsyncThunk(
    "user/googlesignin",
    async (_, { getState, rejectWithValue }) => {
        const session: any = await getSession();
        if (session) {
            const result = await AUTHPOST("UserAccount/login-with-google", null, { Authorization: `Bearer ${session?.id_token}`, });

            if (!result.isSuccess) {
                return rejectWithValue('Error Occurred.');
            } else {
                if (result.msg?.accessToken) {
                    handleCookie(result.msg);
                    return result.msg;
                } else {
                    if (result.msg?.Message)
                        return rejectWithValue(result.msg?.Message);
                }
            }
        } else {
            signIn('google');
            return rejectWithValue('Please sign in your Google Account.')
        }
    }
);

export const SignOut = createAsyncThunk(
    "user/signout",
    async (_, { getState, rejectWithValue }) => {
        try {
            clearCookie();
            await signOut();
        } catch (error) {
            return rejectWithValue('Error Occurred.');
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
