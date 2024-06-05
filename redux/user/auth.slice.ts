'use client'

import { createSlice } from "@reduxjs/toolkit";
import { GetSubscription, SignInGoogle, SignInManualy } from './auth.action'

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
                alert('signin success');
            })
            .addCase(SignInManualy.rejected, (state, { payload }) => {
                state.loading = false;
                state.profile = null;
                state.authresult = null;
            })

            .addCase(SignInGoogle.pending, (state) => {
                state.loading = true;
                console.log("pending")
            })
            .addCase(SignInGoogle.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.authresult = payload;
                console.log("fullfiled", payload)
            })
            .addCase(SignInGoogle.rejected, (state, { payload }) => {
                state.loading = false;
                state.profile = null;
                state.authresult = null;
                console.log("rejected ", payload)
            })
            .addCase(GetSubscription.fulfilled, (state, { payload }) => {
                state.subscription = payload;
                console.log("subscription loaded ", payload)
            })
    },
});

export const { udpateUser, } = userSlice.actions;
export default userSlice.reducer;
