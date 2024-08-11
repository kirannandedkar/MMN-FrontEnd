'use client'

import { createSlice } from "@reduxjs/toolkit";
import { GetSubscription, SignInGoogle, SignInMailVerification, SignInManualy, SignOut } from './auth.action';
import { toast } from "react-toastify";
import { AuthResult } from "@/app/types";

type auth = {
    loading: boolean,
    profile: null,
    authresult: AuthResult | null,
    subscription: null
}

const initialState : auth = {
    loading: false,
    profile: null,
    authresult: null,
    subscription: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.profile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SignInManualy.pending, (state) => {
                state.loading = true;
            })
            .addCase(SignInManualy.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.authresult = payload;
                // Assuming `profile` is part of the payload
                state.profile = payload.profile;
                toast.success('Sign-in successful!');
            })
            .addCase(SignInManualy.rejected, (state, { payload }) => {
                state.loading = false;
                state.profile = null;
                state.authresult = null;
                toast.error(`${payload}`);
            })
            .addCase(SignInMailVerification.fulfilled, (state, { payload }) => {
                state.authresult = payload;
            })
            .addCase(SignInMailVerification.rejected, (state, { payload }) => {
                state.loading = false;
                state.authresult = null;
                toast.error(`${payload}`);
            })
            .addCase(SignInGoogle.pending, (state) => {
                state.loading = true;
            })
            .addCase(SignInGoogle.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.authresult = payload;
                state.profile = payload.profile;
                toast.success('Google sign-in successful!');
            })
            .addCase(SignInGoogle.rejected, (state, { payload }) => {
                state.loading = false;
                state.profile = null;
                state.authresult = null;
                toast.error(`${payload}`);
            })
            .addCase(GetSubscription.fulfilled, (state, { payload }) => {
                state.subscription = payload;
            })
            .addCase(GetSubscription.rejected, (state, { payload }) => {
                state.subscription = null;
                toast.error(`${payload}`);
            })
            .addCase(SignOut.fulfilled, (state) => {
                state.loading = false;
                state.profile = null;
                state.authresult = null;
                state.subscription = null;
                toast.success('Sign-out successful!');
            })
            .addCase(SignOut.rejected, (state, { payload }) => {
                state.loading = false;
                toast.error(`${payload}`);
            });
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
