'use client'

import { createSlice } from "@reduxjs/toolkit";
import {GetSubscription, SignInGoogle, SignInManualy, SignOut} from './auth.action'
import { toast } from "react-toastify";

const initialState = {
    loading: false,
    profile: null,
    authresult: null,
    subscription: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        udpateUser: (state, action) => {

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
            })
            .addCase(SignInManualy.rejected, (state, { payload }) => {
                state.loading = false;
                state.profile = null;
                state.authresult = null;
                toast.error(`${payload}`);
            })

            .addCase(SignInGoogle.pending, (state) => {
                state.loading = true;
            })
            .addCase(SignInGoogle.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.authresult = payload;
                // toast.success('Signin success');
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
            .addCase(SignOut.fulfilled, (state) => {
                state.loading = false;
                state.profile = null;
                state.authresult = null;
                state.subscription = null;
            })
            .addCase(SignOut.rejected, (state, { payload }) => {
                state.loading = false;
                toast.error(`${payload}`);
            });
    },
});

export const { udpateUser, } = userSlice.actions;
export default userSlice.reducer;
