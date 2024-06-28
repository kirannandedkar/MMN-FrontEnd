'use client'

import { useDispatch } from "react-redux";
import { APIPOST } from "./fetch-api";
import { AppDispatch } from "@/redux/store";
import { GetSubscription } from "@/redux/user/auth.action";

const PaymentCallback = async (paymentId: string) => {
    if(!paymentId)
        return;
}

export { PaymentCallback };